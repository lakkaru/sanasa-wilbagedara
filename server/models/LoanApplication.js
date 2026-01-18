const mongoose = require('mongoose');

/**
 * Loan Application Schema - Sanasa Bank Wilbagedara
 * Handles loan application submissions from members
 */
const loanApplicationSchema = new mongoose.Schema(
  {
    // Application Reference
    applicationNumber: {
      type: String,
      unique: true,
      required: true,
    },

    // Applicant Information
    applicant: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
      },
      nameInSinhala: String,
      nic: {
        type: String,
        required: [true, 'NIC number is required'],
        trim: true,
        match: [/^([0-9]{9}[vVxX]|[0-9]{12})$/, 'Please provide a valid NIC number'],
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
      },
      maritalStatus: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
      },
      occupation: {
        type: String,
        required: true,
      },
      employer: String,
      monthlyIncome: {
        type: Number,
        required: true,
        min: [0, 'Monthly income cannot be negative'],
      },
    },

    // Contact Information
    contact: {
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^(\+94|0)?[0-9]{9,10}$/, 'Please provide a valid phone number'],
      },
      whatsapp: String,
      email: {
        type: String,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      },
      address: {
        line1: { type: String, required: true },
        line2: String,
        city: { type: String, required: true },
        district: { type: String, default: 'Bandarakoswaththa' },
        postalCode: String,
      },
    },

    // Loan Details
    loan: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      productName: String, // Denormalized for quick access
      amountRequested: {
        type: Number,
        required: [true, 'Loan amount is required'],
        min: [1000, 'Minimum loan amount is Rs. 1,000'],
      },
      purpose: {
        type: String,
        required: [true, 'Loan purpose is required'],
      },
      purposeCategory: {
        type: String,
        enum: [
          'business_expansion',
          'working_capital',
          'equipment_purchase',
          'agriculture',
          'education',
          'medical',
          'home_improvement',
          'vehicle',
          'personal',
          'other',
        ],
      },
      tenureMonths: {
        type: Number,
        required: true,
        min: [1, 'Minimum tenure is 1 month'],
      },
      preferredStartDate: Date,
    },

    // Membership Information
    membership: {
      memberNumber: String,
      isMember: {
        type: Boolean,
        default: false,
      },
      memberSince: Date,
      shareCapital: {
        type: Number,
        default: 0,
      },
      existingLoans: [{
        loanType: String,
        outstandingAmount: Number,
        monthlyPayment: Number,
      }],
    },

    // Collateral/Security
    collateral: {
      type: {
        type: String,
        enum: ['property', 'vehicle', 'fixed_deposit', 'gold', 'guarantor', 'none'],
      },
      description: String,
      estimatedValue: Number,
      documents: [{
        name: String,
        url: String,
        publicId: String,
      }],
    },

    // Guarantor Information (if applicable)
    guarantors: [{
      fullName: { type: String, required: true },
      nic: { type: String, required: true },
      relationship: String,
      phone: { type: String, required: true },
      address: String,
      occupation: String,
      monthlyIncome: Number,
    }],

    // Application Status
    status: {
      type: String,
      enum: [
        'draft',
        'submitted',
        'under_review',
        'documents_required',
        'approved',
        'rejected',
        'disbursed',
        'cancelled',
      ],
      default: 'submitted',
    },
    statusHistory: [{
      status: String,
      changedAt: { type: Date, default: Date.now },
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      remarks: String,
    }],

    // Internal Processing
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAmount: Number,
    approvedTenure: Number,
    interestRate: Number,
    processingFee: Number,
    disbursementDate: Date,
    
    // Documents
    documents: [{
      name: String,
      type: {
        type: String,
        enum: ['nic', 'income_proof', 'bank_statement', 'property_deed', 'other'],
      },
      url: String,
      publicId: String,
      uploadedAt: { type: Date, default: Date.now },
    }],

    // Remarks & Notes
    remarks: [{
      text: String,
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      addedAt: { type: Date, default: Date.now },
    }],
    
    // Source Tracking
    source: {
      type: String,
      enum: ['website', 'walk_in', 'phone', 'referral', 'facebook'],
      default: 'website',
    },
    referralCode: String,

    // Calculated Fields
    calculatedEMI: Number,
    totalPayable: Number,
    debtToIncomeRatio: Number,
  },
  {
    timestamps: true,
  }
);

// Indexes
loanApplicationSchema.index({ applicationNumber: 1 });
loanApplicationSchema.index({ 'applicant.nic': 1 });
loanApplicationSchema.index({ status: 1, createdAt: -1 });
loanApplicationSchema.index({ assignedTo: 1, status: 1 });

// Pre-save middleware to generate application number
loanApplicationSchema.pre('save', async function (next) {
  if (this.isNew && !this.applicationNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    // Get the count of applications this month
    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      },
    });
    
    this.applicationNumber = `WLB${year}${month}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Calculate EMI before save
loanApplicationSchema.pre('save', function (next) {
  if (this.loan.amountRequested && this.loan.tenureMonths && this.interestRate) {
    const principal = this.loan.amountRequested;
    const rate = this.interestRate / 100 / 12;
    const tenure = this.loan.tenureMonths;
    
    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    if (rate > 0) {
      const emi = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
      this.calculatedEMI = Math.round(emi * 100) / 100;
      this.totalPayable = Math.round(emi * tenure * 100) / 100;
    } else {
      this.calculatedEMI = principal / tenure;
      this.totalPayable = principal;
    }
    
    // Debt to Income Ratio
    if (this.applicant.monthlyIncome > 0) {
      this.debtToIncomeRatio = Math.round((this.calculatedEMI / this.applicant.monthlyIncome) * 100 * 100) / 100;
    }
  }
  next();
});

// Method to update status with history
loanApplicationSchema.methods.updateStatus = function (newStatus, userId, remarks = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    changedBy: userId,
    remarks,
  });
  return this.save();
};

// Static method to get applications by status
loanApplicationSchema.statics.getByStatus = function (status, limit = 50) {
  return this.find({ status })
    .populate('loan.product', 'name category')
    .populate('assignedTo', 'name')
    .sort({ createdAt: -1 })
    .limit(limit);
};

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication;

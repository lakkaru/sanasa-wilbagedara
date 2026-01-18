const mongoose = require('mongoose');

/**
 * Product Schema - Sanasa Bank Wilbagedara
 * 
 * Handles both Savings Accounts and Loan Schemes
 * Used for: SDB Lakdaru, SDB Jawaya, Uththamavi, Senior Citizen,
 *           Personal Loans, SME/Divi Saviya, Agricultural Loans
 */
const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    nameInSinhala: {
      type: String,
      trim: true,
      maxlength: [100, 'Sinhala name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },

    // Product Classification
    productType: {
      type: String,
      required: true,
      enum: {
        values: ['savings', 'loan'],
        message: 'Product type must be either savings or loan',
      },
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
          // Savings Categories
          'children',      // SDB Lakdaru
          'youth',         // SDB Jawaya
          'women',         // Uththamavi
          'senior',        // Senior Citizen
          'general',       // General Savings
          // Loan Categories
          'personal',      // Personal Loans
          'business',      // SME/Divi Saviya
          'agricultural',  // Cultivation Loans
          'emergency',     // Emergency Loans
          'housing',       // Housing Loans
        ],
        message: 'Please select a valid category',
      },
    },

    // Financial Terms
    interestRate: {
      min: {
        type: Number,
        min: [0, 'Interest rate cannot be negative'],
      },
      max: {
        type: Number,
        min: [0, 'Interest rate cannot be negative'],
      },
      type: {
        type: String,
        enum: ['fixed', 'variable', 'reducing'],
        default: 'fixed',
      },
    },

    // For Savings Products
    minimumDeposit: {
      type: Number,
      min: [0, 'Minimum deposit cannot be negative'],
    },
    minimumBalance: {
      type: Number,
      min: [0, 'Minimum balance cannot be negative'],
    },

    // For Loan Products
    loanAmount: {
      min: {
        type: Number,
        min: [0, 'Minimum loan amount cannot be negative'],
      },
      max: {
        type: Number,
        min: [0, 'Maximum loan amount cannot be negative'],
      },
    },
    tenure: {
      min: {
        type: Number, // in months
        min: [1, 'Minimum tenure must be at least 1 month'],
      },
      max: {
        type: Number, // in months
        min: [1, 'Maximum tenure must be at least 1 month'],
      },
    },
    processingFee: {
      type: Number,
      min: [0, 'Processing fee cannot be negative'],
      default: 0,
    },
    collateralRequired: {
      type: Boolean,
      default: false,
    },
    collateralTypes: [{
      type: String,
      enum: ['property', 'vehicle', 'fixed_deposit', 'gold', 'guarantor', 'none'],
    }],

    // Eligibility Criteria
    eligibility: {
      minAge: {
        type: Number,
        min: [0, 'Minimum age cannot be negative'],
      },
      maxAge: {
        type: Number,
        min: [0, 'Maximum age cannot be negative'],
      },
      membershipRequired: {
        type: Boolean,
        default: true,
      },
      minMembershipPeriod: {
        type: Number, // in months
        default: 0,
      },
      requiredDocuments: [{
        type: String,
      }],
      incomeRequirement: {
        type: String,
      },
      residencyRequirement: {
        type: String,
        default: 'Wilbagedara area resident',
      },
    },

    // Features & Benefits
    features: [{
      title: String,
      description: String,
      icon: String, // Icon name or class
    }],
    benefits: [{
      type: String,
    }],

    // Terms and Conditions
    termsAndConditions: [{
      type: String,
    }],

    // Display Settings
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredImage: {
      url: String,
      publicId: String, // Cloudinary public ID
      alt: String,
    },
    icon: {
      type: String, // Icon name for UI display
    },
    colorTheme: {
      type: String,
      enum: ['green', 'blue', 'gold', 'purple', 'orange'],
      default: 'green',
    },

    // SEO Fields
    seo: {
      metaTitle: {
        type: String,
        maxlength: [60, 'Meta title should not exceed 60 characters'],
      },
      metaDescription: {
        type: String,
        maxlength: [160, 'Meta description should not exceed 160 characters'],
      },
      keywords: [{
        type: String,
      }],
      canonicalUrl: String,
    },

    // Additional Information
    faqs: [{
      question: String,
      answer: String,
    }],
    relatedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],

    // Audit Fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
productSchema.index({ productType: 1, category: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ isActive: 1, isFeatured: -1, displayOrder: 1 });
productSchema.index({ 'seo.keywords': 1 });

// Virtual for formatted interest rate display
productSchema.virtual('interestRateDisplay').get(function () {
  if (!this.interestRate) return null;
  
  if (this.interestRate.min === this.interestRate.max) {
    return `${this.interestRate.min}%`;
  }
  return `${this.interestRate.min}% - ${this.interestRate.max}%`;
});

// Virtual for loan amount display
productSchema.virtual('loanAmountDisplay').get(function () {
  if (!this.loanAmount) return null;
  
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `Rs. ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `Rs. ${(amount / 1000).toFixed(0)}K`;
    }
    return `Rs. ${amount}`;
  };

  return `${formatAmount(this.loanAmount.min)} - ${formatAmount(this.loanAmount.max)}`;
});

// Virtual for tenure display
productSchema.virtual('tenureDisplay').get(function () {
  if (!this.tenure) return null;
  
  const formatTenure = (months) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      }
      return `${years}y ${remainingMonths}m`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return `${formatTenure(this.tenure.min)} - ${formatTenure(this.tenure.max)}`;
});

// Pre-save middleware to generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Static method to get active products by type
productSchema.statics.getActiveProducts = function (productType) {
  return this.find({ productType, isActive: true })
    .sort({ displayOrder: 1, createdAt: -1 });
};

// Static method to get featured products
productSchema.statics.getFeaturedProducts = function () {
  return this.find({ isActive: true, isFeatured: true })
    .sort({ displayOrder: 1 })
    .limit(6);
};

// Static method to find by category
productSchema.statics.getByCategory = function (productType, category) {
  return this.find({ productType, category, isActive: true })
    .sort({ displayOrder: 1 });
};

// Instance method to check eligibility
productSchema.methods.checkEligibility = function (applicant) {
  const eligibility = this.eligibility;
  const issues = [];

  if (eligibility.minAge && applicant.age < eligibility.minAge) {
    issues.push(`Minimum age requirement is ${eligibility.minAge} years`);
  }

  if (eligibility.maxAge && applicant.age > eligibility.maxAge) {
    issues.push(`Maximum age limit is ${eligibility.maxAge} years`);
  }

  if (eligibility.membershipRequired && !applicant.isMember) {
    issues.push('SANASA membership is required');
  }

  return {
    isEligible: issues.length === 0,
    issues,
  };
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

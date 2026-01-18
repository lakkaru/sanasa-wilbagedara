const mongoose = require('mongoose');

/**
 * Inquiry Schema - Sanasa Bank Wilbagedara
 * Handles membership inquiries and contact form submissions
 */
const inquirySchema = new mongoose.Schema(
  {
    // Inquiry Type
    type: {
      type: String,
      required: true,
      enum: ['membership', 'general', 'loan', 'savings', 'complaint', 'feedback'],
    },

    // Contact Information
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^(\+94|0)?[0-9]{9,10}$/, 'Please provide a valid phone number'],
    },
    address: {
      type: String,
      maxlength: [300, 'Address cannot exceed 300 characters'],
    },

    // Inquiry Details
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },

    // For Membership Inquiries
    membershipDetails: {
      nic: String,
      dateOfBirth: Date,
      occupation: String,
      interestedProducts: [{
        type: String,
        enum: ['savings', 'loan', 'both'],
      }],
    },

    // Status Tracking
    status: {
      type: String,
      enum: ['new', 'in_progress', 'responded', 'resolved', 'closed'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // Response History
    responses: [{
      message: String,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      respondedAt: {
        type: Date,
        default: Date.now,
      },
      method: {
        type: String,
        enum: ['email', 'phone', 'whatsapp', 'in_person'],
      },
    }],

    // Source Tracking
    source: {
      type: String,
      enum: ['website', 'facebook', 'walk_in', 'phone', 'whatsapp'],
      default: 'website',
    },
    ipAddress: String,
    userAgent: String,

    // Resolution
    resolvedAt: Date,
    resolutionNotes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
inquirySchema.index({ type: 1, status: 1 });
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ phone: 1 });
inquirySchema.index({ assignedTo: 1, status: 1 });

// Virtual for response time
inquirySchema.virtual('responseTime').get(function () {
  if (this.responses && this.responses.length > 0) {
    const firstResponse = this.responses[0].respondedAt;
    return firstResponse - this.createdAt;
  }
  return null;
});

// Method to add response
inquirySchema.methods.addResponse = function (message, userId, method = 'phone') {
  this.responses.push({
    message,
    respondedBy: userId,
    method,
  });
  
  if (this.status === 'new') {
    this.status = 'in_progress';
  }
  
  return this.save();
};

// Method to resolve
inquirySchema.methods.resolve = function (notes = '') {
  this.status = 'resolved';
  this.resolvedAt = new Date();
  this.resolutionNotes = notes;
  return this.save();
};

// Static to get dashboard stats
inquirySchema.statics.getDashboardStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayCount = await this.countDocuments({
    createdAt: { $gte: today },
  });
  
  return {
    byStatus: stats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
    todayCount,
  };
};

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;

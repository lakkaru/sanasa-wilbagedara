const mongoose = require('mongoose');

/**
 * Activity Schema - Sanasa Bank Wilbagedara
 * Handles community activities, events, and Facebook-style posts
 */
const activitySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, 'Activity title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    titleInSinhala: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },

    // Activity Type
    category: {
      type: String,
      required: true,
      enum: [
        'csr',              // Corporate Social Responsibility
        'member_meeting',   // Member meetings
        'event',            // General events
        'training',         // Training programs
        'celebration',      // Festivals, anniversaries
        'community',        // Community service
        'agriculture',      // Agricultural programs
        'news',             // General news
        'announcement',     // Important announcements
      ],
    },

    // Date and Location
    eventDate: {
      type: Date,
    },
    location: {
      name: String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Media
    images: [{
      url: {
        type: String,
        required: true,
      },
      publicId: String, // Cloudinary public ID
      caption: String,
      alt: String,
      isCover: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Number,
        default: 0,
      },
    }],
    videos: [{
      url: String,
      thumbnail: String,
      title: String,
      platform: {
        type: String,
        enum: ['youtube', 'facebook', 'uploaded'],
      },
    }],

    // Social Media Integration
    facebookPost: {
      postId: String,
      postUrl: String,
      syncedAt: Date,
    },

    // Content Settings
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },

    // Engagement (for future use)
    viewCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },

    // SEO
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    // Tags for filtering
    tags: [{
      type: String,
      lowercase: true,
    }],

    // Participants (optional)
    participants: [{
      name: String,
      role: String,
    }],

    // Author/Editor
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

// Indexes
activitySchema.index({ status: 1, publishedAt: -1 });
activitySchema.index({ category: 1, status: 1 });
activitySchema.index({ slug: 1 });
activitySchema.index({ tags: 1 });
activitySchema.index({ isPinned: -1, isFeatured: -1, publishedAt: -1 });

// Virtual for cover image
activitySchema.virtual('coverImage').get(function () {
  if (this.images && this.images.length > 0) {
    const cover = this.images.find(img => img.isCover);
    return cover || this.images[0];
  }
  return null;
});

// Virtual for formatted date
activitySchema.virtual('formattedDate').get(function () {
  const date = this.eventDate || this.publishedAt;
  return date ? date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : null;
});

// Pre-save middleware
activitySchema.pre('save', function (next) {
  // Generate slug from title
  if (this.isModified('title') && !this.slug) {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`;
    this.slug = `${this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50)}-${dateStr}`;
  }

  // Generate excerpt from description
  if (this.isModified('description') && !this.excerpt) {
    this.excerpt = this.description.substring(0, 250) + 
      (this.description.length > 250 ? '...' : '');
  }

  next();
});

// Static methods
activitySchema.statics.getPublished = function (limit = 10, skip = 0) {
  return this.find({ status: 'published' })
    .sort({ isPinned: -1, publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');
};

activitySchema.statics.getByCategory = function (category, limit = 10) {
  return this.find({ status: 'published', category })
    .sort({ publishedAt: -1 })
    .limit(limit);
};

activitySchema.statics.getFeatured = function (limit = 5) {
  return this.find({ status: 'published', isFeatured: true })
    .sort({ publishedAt: -1 })
    .limit(limit);
};

activitySchema.statics.getLatestNews = function (limit = 5) {
  return this.find({ 
    status: 'published',
    category: { $in: ['news', 'announcement', 'event'] }
  })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select('title slug excerpt publishedAt category');
};

// Instance method to increment view
activitySchema.methods.incrementView = function () {
  this.viewCount += 1;
  return this.save();
};

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

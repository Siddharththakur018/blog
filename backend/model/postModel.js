const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    status: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Draft'
    },
    isPremium: {
      type: Boolean,
      default: true, 
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    }
}, { timestamps: true });

postSchema.pre('save', async function (next) {
  console.log('Pre-save hook triggered for Post:', this.title);

  if (!this.isModified('title')) {
    console.log('Title not modified, skipping slug generation.');
    return next();
  }

  try {
    let slug = slugify(this.title, { lower: true, strict: true });
    console.log('Initial slug:', slug);

    let slugExists = await this.constructor.findOne({ slug });
    let suffix = 1;

    while (slugExists) {
      slug = slugify(this.title, { lower: true, strict: true }) + '-' + suffix;
      console.log('Slug exists, trying new slug:', slug);
      slugExists = await this.constructor.findOne({ slug });
      suffix++;
    }

    this.slug = slug;
    console.log('Final slug set on post:', this.slug);

    next();
  } catch (err) {
    console.error('Error generating slug:', err);
    next(err);
  }
});



module.exports = mongoose.model('Post', postSchema);

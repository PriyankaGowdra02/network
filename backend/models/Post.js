
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 500
  },
  media: {
    type: String,
    default: ''
  },
  filter: {
    type: String,
    enum: ['none', 'circuit-glow', 'data-pulse', 'neural-flow'],
    default: 'none'
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visibility: {
    type: String,
    enum: ['public', 'cluster-only', 'private'],
    default: 'public'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for improved performance
postSchema.index({ creatorId: 1, createdAt: -1 });
postSchema.index({ visibility: 1, createdAt: -1 });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

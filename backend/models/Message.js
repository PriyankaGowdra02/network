
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clusterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cluster'
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure messages are either sent to a user or a cluster
messageSchema.pre('save', function(next) {
  if (!this.recipientId && !this.clusterId) {
    return next(new Error('Message must have either a recipient user or a cluster'));
  }
  next();
});

// Index for improved query performance
messageSchema.index({ senderId: 1, recipientId: 1, createdAt: -1 });
messageSchema.index({ clusterId: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

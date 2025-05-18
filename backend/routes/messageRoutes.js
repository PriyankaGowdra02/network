
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all messages for a user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id },
        { recipientId: req.user.id }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('senderId', 'username avatar')
    .populate('recipientId', 'username avatar');
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const { content, recipientId, clusterId } = req.body;
    
    const newMessage = new Message({
      content,
      senderId: req.user.id,
      recipientId,
      clusterId
    });
    
    const message = await newMessage.save();
    
    const populatedMessage = await Message.findById(message._id)
      .populate('senderId', 'username avatar')
      .populate('recipientId', 'username avatar');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get message thread between two users
router.get('/thread/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, recipientId: req.params.userId },
        { senderId: req.params.userId, recipientId: req.user.id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('senderId', 'username avatar')
    .populate('recipientId', 'username avatar');
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

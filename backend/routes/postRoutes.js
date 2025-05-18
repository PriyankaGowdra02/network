
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, media, filter, visibility } = req.body;
    
    const newPost = new Post({
      content,
      media,
      filter,
      visibility,
      creatorId: req.user.id
    });
    
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all public posts (feed)
router.get('/feed', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const posts = await Post.find({ visibility: 'public' })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('creatorId', 'username avatar');
    
    const count = await Post.countDocuments({ visibility: 'public' });
    
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get posts by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const posts = await Post.find({ 
      creatorId: userId,
      visibility: 'public' // Only show public posts
    })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate('creatorId', 'username avatar');
    
    const count = await Post.countDocuments({ creatorId: userId, visibility: 'public' });
    
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

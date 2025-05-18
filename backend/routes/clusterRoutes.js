
const express = require('express');
const router = express.Router();
const Cluster = require('../models/Cluster');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a new cluster
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, banner } = req.body;
    
    // Check if cluster name already exists
    const existingCluster = await Cluster.findOne({ name });
    if (existingCluster) {
      return res.status(400).json({ message: 'Cluster with this name already exists' });
    }
    
    const newCluster = new Cluster({
      name,
      description,
      banner,
      members: [{ userId: req.user.id, role: 'admin' }]
    });
    
    const cluster = await newCluster.save();
    res.status(201).json(cluster);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all clusters
router.get('/', async (req, res) => {
  try {
    const clusters = await Cluster.find()
      .select('name description banner members')
      .sort({ createdAt: -1 });
    
    res.json(clusters);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single cluster by ID
router.get('/:id', async (req, res) => {
  try {
    const cluster = await Cluster.findById(req.params.id)
      .populate('members.userId', 'username avatar');
    
    if (!cluster) {
      return res.status(404).json({ message: 'Cluster not found' });
    }
    
    res.json(cluster);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

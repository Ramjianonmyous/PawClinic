const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AIQuery = require('../models/AIQuery');

// @route   POST api/ai/save
// @desc    Save an AI query
// @access  Private
router.post('/save', auth, async (req, res) => {
  try {
    const { feature, input, result } = req.body;
    
    const newQuery = new AIQuery({
      userId: req.user.id,
      feature,
      input,
      result
    });

    const query = await newQuery.save();
    res.json(query);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/ai/history
// @desc    Get user's AI queries
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const queries = await AIQuery.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

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

module.exports = router;

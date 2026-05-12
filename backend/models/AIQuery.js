const mongoose = require('mongoose');

const aiQuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feature: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AIQuery', aiQuerySchema);

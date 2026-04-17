const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String, // String comparison for topic (Array, DP, etc.)
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  platform: {
    type: String,
    trim: true,
  },
  problemUrl: {
    type: String,
    trim: true,
  },
  dateSolved: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  screenshot: {
    type: String, // Path to stored image
  },
  status: {
    type: String,
    enum: ['Solved', 'Revise Later', 'Important'],
    default: 'Solved',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Problem', problemSchema);

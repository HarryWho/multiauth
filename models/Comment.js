const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Comment', CommentSchema);
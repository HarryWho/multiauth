const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  image: {
    type: String,
    default: '/img/default-user.png'
  },
  password: String,
  joinedDate: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    default: 'basic'
  }
})

module.exports = mongoose.model('User', UserSchema);
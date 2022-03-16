const User = require('../models/googleSchema')
const bcrypt = require('bcryptjs')
const { escapeRegExpChars } = require('ejs/lib/utils')
module.exports = {
  ensureAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      return next()
    }
  },

  verifyForm: async function(body, cb) {
    let errors = []
    if (!body.displayName || !body.email || !body.password || !body.password2) {
      errors.push({ msg: 'Please fill in all required fields' });
    }
    var mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!body.email.match(mailformat)) {
      errors.push({ msg: "This is not a valid email address" });
    } else {
      const user = await User.findOne({ email: body.email })
      if (user) {
        errors.push({ msg: "Email is already registered" })
      }
    }
    if (body.password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' })
    }
    if (body.password != body.password2) {
      errors.push({ msg: "Passwords do not match" })
    }

    cb(errors)
  },
  comparePassword: async function(password, user, cb) {
    // console.log(password, user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    cb(isMatch)
  }

}
const express = require('express')
const router = express.Router();
const passport = require('passport')
require('../../config/google_passport')

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));


module.exports = router;
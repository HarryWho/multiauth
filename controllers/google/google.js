const express = require('express')
const router = express.Router();
const passport = require('passport')
require('../../config/google_passport')


// DESC: gets the google login screen for passport-google-oauth20 strategy
// GET: /google/auth/google
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }));


// DESC: callback function after loging in via the passport-google-oauth2 startegy
// GET: /google/auth/google/callback 
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));


module.exports = router;
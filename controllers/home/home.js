const express = require('express');

const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/ensureAuth')

//const { verifyRole } = require('../../middleware/verifyRole');

router.get('/', ensureGuest, (req, res) => {
  res.render('home/home')
})

router.get('/dashboard', ensureAuth, (req, res) => {

  res.render("home/dashboard", { user: req.user })
})

router.get('/logout', ensureAuth, (req, res) => {
  req.logout();
  res.redirect('/')
})

router.get('/register', ensureGuest, (req, res) => {
  res.render("home/register", { form: '' })
})
module.exports = router
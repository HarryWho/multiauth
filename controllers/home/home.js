const express = require('express');

const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/ensureAuth')
const Article = require('../../models/Article')

// DESC: gets the hompage login
// GET:  
router.get('/', ensureGuest, (req, res) => {
  res.render('home/home')
})


// DESC: gets the dashboard after login
// GET: 
router.get('/dashboard', ensureAuth, async(req, res) => {
  const articles = await Article.find({ author: req.user.id }, { body: 0, author: 0, comment: 0 });
  res.render("home/dashboard", { user: req.user, articles: articles })
})


// DESC: Logout and redirect to home page login
// GET: 
router.get('/logout', ensureAuth, (req, res) => {
  req.logout();
  res.redirect('/')
})


// DESC: gets the registration form
// GET: 
router.get('/register', ensureGuest, (req, res) => {
  res.render("home/register", { form: '' })
})
module.exports = router
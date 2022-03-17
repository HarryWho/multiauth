const express = require('express');

const router = express.Router();
const { ensureAuth, ensureGuest } = require('../../middleware/ensureAuth')
const Article = require('../../models/Article')
  //const { verifyRole } = require('../../middleware/verifyRole');

router.get('/', ensureGuest, (req, res) => {
  res.render('home/home')
})


router.get('/dashboard', ensureAuth, async(req, res) => {
  const articles = await Article.find({ author: req.user.id }, { body: 0, author: 0, comment: 0 });
  res.render("home/dashboard", { user: req.user, articles: articles })
})

router.get('/logout', ensureAuth, (req, res) => {
  req.logout();
  res.redirect('/')
})

router.get('/register', ensureGuest, (req, res) => {
  res.render("home/register", { form: '' })
})
module.exports = router
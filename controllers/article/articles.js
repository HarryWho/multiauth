const express = require('express')
const router = express.Router();
const Article = require('../../models/Article')

router.get('/', (req, res) => {
  res.render('article/article_form', {
    user: req.user,
    article: new Article(),
    caption: 'Create',
    action: '/article'
  });
})

router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findOne({ _id: req.params.articleID })
  console.log(article);
  res.render('article/article_form', {
    user: req.user,
    article: article,
    caption: 'Edit',
    action: `/article/${article._id}?_method=PUT`
  });
})

router.put('/:articleID', async(req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.articleID, req.body)
    article.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }

})

router.delete('/:articleID', async(req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleID)
    article.save();

    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/', async(req, res) => {
  const newArticle = {
    author: req.user.id,
    title: req.body.title,
    status: req.body.status,
    body: req.body.body,
  }
  try {
    const article = new Article(newArticle)
    await article.save();
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }

})


module.exports = router;
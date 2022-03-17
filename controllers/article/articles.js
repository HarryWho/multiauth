const express = require('express')
const router = express.Router();
const Article = require('../../models/Article')

// DESC: gets all public articles
// GET: /article/all
router.get('/all', async(req, res) => {
  const articles = await Article.find({ status: 'public' })
    .populate({ path: 'author', select: ['displayName', 'image', '_id'] })

  res.render('article/display_all_public_articles', {
    user: req.user,
    articles: articles,
    caption: 'All Articles'
  })
})

// DESC: gets the form for submiting new article
// GET: /article
router.get('/', (req, res) => {
  res.render('article/article_form', {
    user: req.user,
    article: new Article(),
    caption: 'Create',
    action: '/article'
  });
})

// DESC: gets article by articleID and displays it in a single page
// GET: /article/:articleID
router.get('/:articleID', async(req, res) => {
  try {
    const article = await Article.findById(req.params.articleID)
      .populate({ path: 'author', select: ['_id', 'displayName', 'image'] })

    res.render('article/single_article', {
      user: req.user,
      article: article
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// DESC: gets the form for editing existing article using articleID
// GET: /article/edit/:articleID
router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findOne({ _id: req.params.articleID })

  res.render('article/article_form', {
    user: req.user,
    article: article,
    caption: 'Edit',
    action: `/article/${article._id}?_method=PUT`
  });
})

// DESC: gets all public articles by author using articleID
// GET: /article/by/:articleID
router.get('/by/:articleID', async(req, res) => {
  const articles = await Article.find({ author: req.params.articleID })
    .populate({ path: 'author', select: ['displayName', 'image', '_id'] })

  res.render('article/display_all_public_articles', {
    user: req.user,
    articles: articles,
    caption: `${articles[0].author.displayName}'s Articles`
  });
})

// DESC: editing article using articleID
// PUT: /article/:articleID
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


// DESC: deletes article using articleID
// DELETE: /article/:articleID
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


// DESC: saves new article after submiting
// POST: /article
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
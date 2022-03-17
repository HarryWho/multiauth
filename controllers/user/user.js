const express = require('express')
const router = express.Router();
const { ensureAdmin } = require('../../middleware/verifyRole')

// DESC: gets the admin page
// GET: /user/admin
router.get('/admin', ensureAdmin, (req, res) => {
  res.render('admin/admin', { user: req.user })
})


module.exports = router
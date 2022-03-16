const express = require('express')
const router = express.Router();
const { ensureAdmin } = require('../../middleware/verifyRole')

router.get('/admin', ensureAdmin, (req, res) => {
  res.render('admin/admin', { user: req.user })
})


module.exports = router
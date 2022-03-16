verifyRole = function(permissions, role) {

  return permissions.includes(role)

}

ensureAdmin = function(req, res, next) {
  if (req.user.role == 'admin') {
    return next()
  } else {
    req.flash('error_msg', "You do not have permissions to view that page");
    res.redirect('/dashboard');
  }
}
module.exports = { verifyRole, ensureAdmin };
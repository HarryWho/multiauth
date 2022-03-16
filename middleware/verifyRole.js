verifyRole = function(permissions, role) {
  console.log(permissions.includes(role))
  return permissions.includes(role)

}
module.exports = verifyRole;
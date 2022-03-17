const moment = require('moment');


formatDate = function(date, format) {
  return moment(date).format(format);
}
stripTags = function(str) {
  return str.replace(/(<([^>]+)>)/ig, '');
}
truncate = function(str, len) {
  if (str.length < len) return str;
  let truncStr = str.substring(0, len)
  truncStr = truncStr.substring(0, truncStr.lastIndexOf(' '))
  return truncStr + '...'
}
module.exports = {
  formatDate,
  stripTags,
  truncate
}
const moment = require('moment');


formatDate = function(date, format) {
  return moment(date).format(format);
}
stripTags = function(str) {
  return str.replace(/(<([^>]+)>)/ig, '');
}

module.exports = {
  formatDate,
  stripTags
}
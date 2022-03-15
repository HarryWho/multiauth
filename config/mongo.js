const mongoose = require('mongoose');

module.exports = {
  MongoDB: function(mongo_path) {
    mongoose.connect(mongo_path)

    const connection = mongoose.connection;
    connection.on('error', (err) => {
      console.log(err.message)
    });
    connection.once('open', () => {
      console.log("Mongo Connected...")
    })
  }
}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catalogue = new Schema({
  title: String,
  price: Number,
  likes: Number
});

module.exports = mongoose.model('Catalogue', catalogue);

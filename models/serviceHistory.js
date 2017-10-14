var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catalogue = new Schema({
  type: String,
  products: [{
    type: ObjectId,
    ref: 'Catalogue'
  }]
});

module.exports = mongoose.model('ServiceHistory', serviceHistory);

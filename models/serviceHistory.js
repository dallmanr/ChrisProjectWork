var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var catalogue = new Schema({
  service_type: {String, required: true},
  service_details: {String, required: true},
  car: [{type: ObjectId, ref: 'Catalogue'}]
});

module.exports = mongoose.model('ServiceHistory', serviceHistory);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var service = new Schema({
  service_type: {type: String, required: true},
  service_details: {type: String, required: true},
  remarks: String,
  car: [{type: ObjectId, ref: 'Car'}]
});

module.exports = mongoose.model('Service', service);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catalogue = new Schema({
  remarks: String,
  cat_number: {Integer, required: true},
  ltd_edition: String,
  car_manufactuer: {String, required: true},
  manufacturer_model: {String, required: true},
  car_number: Integer,
  colour: {String, required: true},
  type: {String, required: true},
  model_manufacturer: {String, required: true},
  cost: {Integer, required: true},
  received: {Date, required: true},
  source: {String, required: true},
  make: {String, required: true},
  year: Date
});

module.exports = mongoose.model('Catalogue', catalogue);

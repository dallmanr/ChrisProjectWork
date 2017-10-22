var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var car = new Schema({
  remarks: String,
  cat_number: {type: String, required: true},
  ltd_edition: String,
  car_manufactuer: {type: String, required: true},
  manufacturer_model: {type: String, required: true},
  car_number: Number,
  colour: {type: String, required: true},
  type: {type: String, required: true},
  model_manufacturer: {type: String, required: true},
  cost: {type: Number, required: true},
  received: {type: String, required: true},
  source: {type: String, required: true},
  make: {type: String, required: true},
  year: String,
  img_path: String
});

module.exports = mongoose.model('Car', car);

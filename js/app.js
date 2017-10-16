var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var MongoClient = require('mongodb').MongoClient;

function getCatNumbers() {
  var catNumbers;
  $.getJSON("http://localhost:3000/allcars", function(data) {
    $.each(data, function(index, item) {
      catNumbers += "<option value='" + item.cat_number + "'>" + item.cat_number + " " + item.car_manufacturer + " " + item.manufacturer_model + " " + item.car_number + " " + item.type + "</option>";
    });
    $('#catNumberDropdown').html(catNumbers);
  });
};

// function getCarManufacturers() {
//   var carManufacturer;
//   $.getJSON("http://localhost:3000/allcars", function(data) {
//     $.each(data, function(index, item) {
//       carManufacturer += "<option value='" + item.car_manufacturer + "'>" + item.car_manufacturer + "</option>";
//     });
//     $('#carManufacturerDropdown').html(carManufacturer);
//   });
// };

function getACarsDetails(val) {
  console.log("Called in app.js");
  var catNumber = val;
  var remarks;
  var ltd_edition;
  var car_manufacturer;
  var manufacturer_model;
  var car_number;
  var colour;
  var type;
  var model_manufacturer;
  var cost;
  var received;
  var source;
  var make;
  var year;
  $.getJSON("http://localhost:3000/acar/" + catNumber, function(data) {
        remarks = data[0].remarks;
        ltd_edition = data[0].ltd_edition;
        car_manufacturer = data[0].car_manufacturer;
        manufacturer_model = data[0].manufacturer_model;
        car_number = data[0].car_number;
        colour = data[0].colour;
        type = data[0].type;
        model_manufacturer = data[0].model_manufacturer;
        cost = data[0].cost;
        received = data[0].received;
        source = data[0].source;
        make = data[0].make;
        year = data[0].year;
        // localStorage.setItem("vanSerialDriverSignOut", serialNumber);
        document.getElementById("manufacturerModelField").value = manufacturer_model;
        document.getElementById("carManufacturerModelField").value = car_manufacturer;
        document.getElementById("carNumberField").value = car_number;
        document.getElementById("colourField").value = colour;
        document.getElementById("carTypeField").value = type;
        document.getElementById("ltdEditionField").value = ltd_edition;
        document.getElementById("modelManufacturerField").value = model_manufacturer;
        document.getElementById("sourceField").value = source;
        document.getElementById("carMakeField").value = make;
        document.getElementById("yearField").value = year;
        document.getElementById("costField").value = cost;
        document.getElementById("remarksField").value = remarks;
    });
  };

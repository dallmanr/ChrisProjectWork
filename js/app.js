var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var formidable = require('formidable');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

//Code for obtaining all car details
function getCatNumbers() {
  var catNumbers;
  $.getJSON("http://localhost:3000/allcars", function(data) {
    $.each(data, function(index, item) {
      catNumbers += "<option value='" + item.cat_number + "'>" + item.cat_number + " " + item.car_manufacturer + " " + item.manufacturer_model + " " + item.car_number + " " + item.type + "</option>";
    });
    $('#catNumberDropdown').html(catNumbers);
  });
};

function getACarsDetails(val) {
  var trHTML;
  console.log("Called in app.js " + val);
  var dbId;
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
  $.getJSON("http://localhost:3000/acar/" + catNumber, function(car) {
      dbId = car._id;
      ltd_edition = car.ltd_edition;
      car_manufacturer = car.car_manufacturer;
      manufacturer_model = car.manufacturer_model;
      car_number = car.car_number;
      colour = car.colour;
      type = car.type;
      model_manufacturer = car.model_manufacturer;
      cost = car.cost;
      received = car.received;
      source = car.source;
      make = car.make;
      year = car.year;
      remarks = car.remarks;
      img_path = car.img_path;

      car.services.forEach(function(car) {
        //index is the name of each of the returned fields
        //item is the value assigned to each field
        console.log(car.service_type);
        trHTML += '<tr><td>' + car.service_type + '</td><td>' + car.service_details + '</td><td>' +
          car.remarks + '</td></tr>';
      });
      
      // remarks = data.remarks;
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
      document.getElementById('carImage').src = img_path;

      $("#serviceHistory").append(trHTML);

    });
};

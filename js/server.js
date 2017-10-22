var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/christestdb');

var Schema = mongoose.Schema;
var Car = require("../models/car");
var Service = require("../models/service")

var fs = require('fs');

app.use(express.static('../'));

//Landing Page - Loaded when the user starts the server
app.get('/', function(req, res){
  // res.sendFile(path.join(__dirname, '/index.html'));
  res.sendFile('index.html', { root: '../' });
});
//

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/christestdb", function (err, db) {
//      if(err) throw err;
//      //Write databse Insert/Update/Query code here.
// });

// app.use('/', express.static(__dirname + '/'));

//GET REQUESTS
//Returns all the cars in the database
app.get('/allcars', function(request, response) {
  // var carId = req.params.carid;
  MongoClient.connect("mongodb://localhost:27017/christestdb", function(err, db) {
    if (err) throw err;
    //Write databse Insert/Update/Query code here.
    db.collection('carCatalogue', function(err, collection) {
      collection.find().toArray(function(err, items) {
        if (err) throw err;
        response.send(items);
      })
    })
  });
});
//End of code to return all cars

//Code to obtain the information for one car. This car may be selected via the catalogue number datalist
app.get('/acar/:catnum', function(request, response) {
  var carId = request.params.catnum;
  MongoClient.connect("mongodb://localhost:27017/christestdb", function(err, db) {
    if (err) throw err;
    //Write databse Insert/Update/Query code here.
    var query = {cat_number: carId};
    db.collection('carCatalogue').find(query).toArray(function(err, result) {
      if (err) throw err;
      response.send(result);
    });
  })
});
//End of obtain one cars information code
//END OF GET REQUESTS

//POST REQUESTS
//The add a new car code via POST. Called from add_a_car.html file
app.post("/addcar", function (req,res) {
  var newCar = new Car();
  newCar.remarks = req.body.remarksField;
  newCar.cat_number = req.body.catNumberField;
  newCar.ltd_edition = req.body.ltdEditionField;
  newCar.car_manufactuer = req.body.carManufacturerModelField;
  newCar.manufacturer_model = req.body.manufacturerModelField;
  newCar.car_number = req.body.carNumberField;
  newCar.colour = req.body.colourField;
  newCar.type = req.body.carTypeField;
  newCar.model_manufacturer = req.body.modelManufacturerField;
  newCar.cost = req.body.costField;
  newCar.received = req.body.dateObtainedField;
  newCar.source = req.body.sourceField;
  newCar.make = req.body.carMakeField;
  newCar.year = req.body.yearField;
  newCar.img_path = req.body.uploads;
  newCar.save(function(err, savedCar) {
    if (err) {
      res.status(500).send({error:"Could not save car"});
    } else {
      res.status(200).send({savedCar});
    }
  });
});
//End of add a new car code

//Starts the server and listens on the given port
app.listen(3000, function() {
  console.log("Chris' running on port 3000");
});
//End of server starting code

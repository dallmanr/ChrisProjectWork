var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/christestdb');

var Schema = mongoose.Schema;
var Car = require("../models/car");
var Service = require("../models/service")

var fs = require('fs');

app.use(express.static('../'));

//Landing Page - Loaded when the user starts the server
app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname, '/index.html'));
  res.sendFile('index.html', {
    root: '../'
  });
});

//GET REQUESTS
//Returns all the cars in the database
app.get('/allcars', function(req, res) {

  Car.find({}, function(err, cars) {
    if (err) {
      res.status(500).send({
        error: "Could not fetch cars"
      });
    } else {
      res.status(200).send(cars)
    }
  })
});
//End of code to return all cars

//Code to obtain the information for one car. This car may be selected via the catalogue number datalist
app.get('/acar/:catnum', function(req, res) {
  Car.findOne({
    cat_number: req.params.catnum
  }, function(err, car) {
    if (err) {
      res.status(500).send({
        error: "Could not find car"
      });
    } else {
      res.status(200).send(car)
    }
  })
});
//End of obtain one cars information code
//END OF GET REQUESTS

//POST REQUESTS
//The add a new car code via POST. Called from add_a_car.html file
app.post("/addcar", function(req, res) {
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
      res.status(500).send({
        error: "Could not save car"
      });
    } else {
      res.status(200).send({
        savedCar
      });
    }
  });
});
//End of add a new car code

//Need a route for creating a new service
app.post('/newservice', function(req, res) {
  var newservice = new Service();
  newservice.service_type = req.body.service_type;
  newservice.service_details = req.body.service_details;
  newservice.service_remarks = req.body.service_remarks;

  newservice.save(function(err, newservice) {
    if (err) {
      res.status(500).send({
        error: "Could not create new serivce"
      });
    } else {
      res.status(200).send(newservice);
    }
  });
});

//Route for adding a new service record to a car
//We want to find the car that is to have a service
//Using the cat_number we can find the car we need.
app.put('/service/car/add',
  function(req, res) {
    Car.findOne({
      cat_number: req.body.cat_number
    }, function(err, car) {
      if (err) {
        res.status(500).send({
          error: "Could not find car"
        });
      } else {
        Service.update({
          _id: req.body.serviceId
        }, {
          $addToSet: {
            car: car._id
          }
        }, function(err, service) {
          if (err) {
            res.status(500).send({
              error: "Could not add service record to car"
            })
          } else {
            res.status(200).send(service);
          }
        });
      }
    });
  });

//Obtain the service records of a car
app.get('/servicehistory/:catnum', function(req, res) {
  Car.find({}).populate({
    path: 'services',
    model: 'Car'
  }).exec(function(err, services) {
    if (err) {
      res.status(500).send({
        error: "Could not find service history of car"
      });
    } else {
      res.status(200).send(services);
    }
  });
});

//Starts the server and listens on the given port
app.listen(3000, function() {
  console.log("Chris' running on port 3000");
});
//End of server starting code

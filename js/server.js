var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var MongoClient = require('mongodb').MongoClient;

var fs = require('fs');

app.use(express.static('../'));

//Landing Page
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

app.listen(3000, function() {
  console.log("Chris' running on port 3000");
});

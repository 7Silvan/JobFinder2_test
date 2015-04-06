var express = require("express");
var mongoose = require("mongoose");
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data.js");

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs({}).then(function(collection){
        res.send(collection);
    });
})

app.get('*', function (req, res) {
    res.render('index');
});

//('mongodb://localhost/jobfinder2');
jobsData.connectDB('mongodb://root:root@ds031551.mongolab.com:31551/jobfinder2')
.then(function() {
   console.log('connected to mongodb successfully!'); 
   jobModel.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);
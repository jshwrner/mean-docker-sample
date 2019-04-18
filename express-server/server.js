// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const PORT = '3000';
// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to DB: " + err));

// Get our API routes
const api = require('./routes/api');
const people = require('./routes/people');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set our api routes
app.use('/api', api, people);

// Get port from environment and store in Express.
const port = process.env.PORT || PORT;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));

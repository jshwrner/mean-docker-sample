// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const PORT = '3000';
const dbHost = 'mongodb://database/mean-docker'; // MongoDB URL from the docker-compose file

// Connect to mongodb
mongoose.connect(dbHost)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Error connecting to DB: " + err));

// Get our API routes
const api = require('./routes/api');
const people = require('./routes/people');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set our api routes - MUST COME AFTER CORS Middleware
app.use('/api', api, people);

// Get port from environment and store in Express.
const port = process.env.PORT || PORT;
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));

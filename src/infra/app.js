var express = require("express");
const R = require('ramda');

var routes = require("./../routes");
var schema = require("./schema");

var app = express();
// parse request body as JSON
app.use(express.json())

// set routes
var router = express.Router()

router.use(function async (req, res, next) {
  // initial logging (can be moved to logger)
  const path = req.url.replace(/\//g, "")
  console.log(`Incoming request method ${req.method} on path ${path}`);
  if (Object.keys(req.body).length !== 0) {
    console.log(req.body);
  };

  // check for method and path specific validation schema
  let valid_schema;
  if (R.has(`${req.method}_${path}`)(schema)) {
    valid_schema = schema[`${req.method}_${path}`]
  } else if (R.has(req.method)(schema)) {
    valid_schema = schema[req.method]
  }

  if (valid_schema) {
    // validate the request based on incoming method and optional path
    var valid_req = valid_schema.validate(req.body);
    if (valid_req.error !== undefined) {
      console.log(`Request validation: ${valid_req.error}`);
      res.status(500).send(valid_req.error);
      res.end();
    } else {
      routes(req, res, next)
    };
  } else {
    routes(req, res, next)
  };
});

// mount the router on the app
app.use('/', router)

module.exports = app;

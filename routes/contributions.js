const express = require("express");
var database = require("../database");
const router = express.Router();
const bodyParser = require("body-parser"); // Middleware to parse JSON request body, this is going to be used to get data from the databackend to frontend static JS

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = router;

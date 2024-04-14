// helpers.js
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

function createRouter() {
    const router = express.Router();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));

    return router;
}

module.exports = { createRouter };
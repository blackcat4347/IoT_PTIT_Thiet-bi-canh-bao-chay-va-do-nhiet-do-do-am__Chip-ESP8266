"use strict";

var express = require("express");

var app = express.Router();

var dashboard = require("./dashboard.route.js");

var systemConfig = require("../../config/system.js");

module.exports.index = function (app) {
  var PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + '/dashboard', dashboard);
};
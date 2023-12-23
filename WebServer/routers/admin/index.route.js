
const express = require("express");
const app = express.Router();

const dashboard = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js");


module.exports.index = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + '/dashboard', dashboard);
};

"use strict";

var evn = require('dotenv').config();

var express = require('express');

var app = express();

var http = require('http').Server(app);

var bodyParser = require('body-parser');

var cors = require('cors');

var port = process.env.PORT;
app.set("views", "views");
app.set('view engine', 'pug');

var system = require('./config/system.js'); // Tạo biến toàn cục sử dụng được trong toàn file.pug


app.locals.prefixAdmin = system.prefixAdmin;
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express["static"]("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

var routerAdmin = require('./routers/admin/index.route.js');

routerAdmin.index(app);
app.get('/', function () {
  console.log('Welcome');
});
http.listen(port, function () {
  console.log('Connection');
});
module.exports = app;
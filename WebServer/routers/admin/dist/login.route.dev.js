"use strict";

var express = require('express');

var router = express.Router();

var controller = require('../../controller/admin/login.controller.js');

router.get('/', controller.login);
router.get('/authen', controller.authen);
module.exports = router;
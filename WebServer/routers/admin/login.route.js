
const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/login.controller.js');

router.get('/', controller.login);
router.post('/authen', controller.authen);
module.exports = router;
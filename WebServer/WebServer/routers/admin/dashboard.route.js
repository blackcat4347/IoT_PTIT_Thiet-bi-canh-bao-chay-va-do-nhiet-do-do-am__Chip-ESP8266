
const express = require('express');
const router = express.Router();
const controller = require('../../controller/admin/dashboard.controller.js');

router.get('/', controller.dashboard);
router.get('/cambienkhigas', controller.cambienkhigas);
router.get('/cambiennhietdo', controller.cambiennhietdo);
router.get('/cambiendoam', controller.cambiendoam);
router.get('/dudoannhietdo', controller.dudoannhietdo);
router.get('/dudoandoam', controller.dudoandoam);
router.post('/sendEmail', controller.sendEmail);
module.exports = router;
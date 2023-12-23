"use strict";

var router = require('../../routers/admin/dashboard.route.js');

var dudoannhietdo = require('../../modules/handler/dudoannhietdo.js');

var dudoandoam = require('../../modules/handler/dudoandoam.js');

var saveDataToDataBase = require('../../public/admin/js/saveDataFromThinkSpeak.js');

var sendEmail = require('../../modules/handler/sendEmail.js');

module.exports.dashboard = function (req, res) {
  saveDataToDataBase();
  res.render('admin/dashboard');
};

module.exports.cambienkhigas = function (req, res) {
  saveDataToDataBase();
  res.render('admin/cambienkhigas');
};

module.exports.cambiennhietdo = function (req, res) {
  saveDataToDataBase();
  res.render('admin/cambiennhietdo');
};

module.exports.cambiendoam = function (req, res) {
  saveDataToDataBase();
  res.render('admin/cambiendoam');
};

module.exports.dudoannhietdo = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(dudoannhietdo());

        case 2:
          res.render('admin/cambiennhietdo');

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.dudoandoam = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(dudoandoam());

        case 2:
          res.render('admin/cambiendoam');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.sendEmail = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(sendEmail(req, res));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};
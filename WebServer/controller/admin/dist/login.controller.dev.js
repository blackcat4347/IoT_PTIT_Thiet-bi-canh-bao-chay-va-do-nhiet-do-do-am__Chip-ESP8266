"use strict";

var Account = require('../../models/account.model'); // [GET] /admin/login


module.exports.login = function (req, res) {
  res.render('admin/login.pug');
}; //[get] /admin/login


module.exports.authen = function _callee(req, res) {
  var account;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Account.findOne({
            username: req.body.username
          }));

        case 3:
          account = _context.sent;
          console.log(account);

          if (account) {
            res.render('admin/dashboard');
          }

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send('Internal Server Error');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
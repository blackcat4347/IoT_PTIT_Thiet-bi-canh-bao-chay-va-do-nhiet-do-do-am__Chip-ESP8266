"use strict";

var _require = require('child_process'),
    exec = _require.exec;

var pythonScriptPath = 'C:\\WebServer\\modules\\handler\\dulieunhietdohuanluyen.py'; // Đường dẫn đến tệp Python

function dudoannhietdo() {
  var child;
  return regeneratorRuntime.async(function dudoannhietdo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(exec("python ".concat(pythonScriptPath), function (error, stdout, stderr) {
            if (error) {
              console.error("L\u1ED7i: ".concat(error.message));
              return;
            }

            console.log("K\u1EBFt qu\u1EA3: ".concat(stdout));
            console.error("L\u1ED7i ti\xEAu chu\u1EA9n: ".concat(stderr));
          }));

        case 2:
          child = _context.sent;
          child.on('close', function (code) {
            console.log("Ti\u1EBFn tr\xECnh Python \u0111\xE3 k\u1EBFt th\xFAc v\u1EDBi m\xE3 tho\xE1t ".concat(code));
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
} // dudoannhietdo()


module.exports = dudoannhietdo;
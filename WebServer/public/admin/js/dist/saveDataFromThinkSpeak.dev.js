"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var fs = require('fs');

var fetch = function fetch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('node-fetch'));
  }).then(function (_ref) {
    var fetch = _ref["default"];
    return fetch.apply(void 0, args);
  });
}; // Đảm bảo bạn đã cài đặt node-fetch hoặc một thư viện tương tự


var apiKey = "PCGSX1024GXGFYA2";
var channelID = "2384827";
var startTime = "2023-12-23T00:00:00Z"; // Tương ứng 22:00 ngày 20/12 theo giờ Việt Nam

var endTime = "2023-12-23T23:59:59Z"; // 23:59:59 GMT ngày 23/12

function convertToVietnamTime(utcTime) {
  var utcDate = new Date(utcTime);
  utcDate.setHours(utcDate.getHours() + 7);
  return utcDate.toISOString();
}

function getData() {
  var url = "https://api.thingspeak.com/channels/".concat(channelID, "/feeds.json?api_key=").concat(apiKey, "&start=").concat(startTime, "&end=").concat(endTime);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var feeds = data.feeds;
    var database = {
      tialua: [],
      // Dùng để lưu trữ dữ liệu tia lửa
      nhietdo: [],
      // Dùng để lưu trữ dữ liệu nhiệt độ
      doam: [] // Dùng để lưu trữ dữ liệu độ ẩm

    };
    console.log('Đã lấy được dữ liệu');
    feeds.forEach(function (entry) {
      var timestamp = Date.parse(entry.created_at); // Chỉ thêm vào mảng tialua nếu field1 không phải là '0'

      if (entry.field1 && entry.field1 !== '0') {
        var tialuaEntry = {
          timestamp: timestamp / 1000,
          created_at: convertToVietnamTime(entry.created_at),
          tialua: parseFloat(entry.field1)
        };
        database.tialua.push(tialuaEntry);
      } // Tương tự cho nhietdo và doam


      if (entry.field2 && entry.field2 !== '0') {
        var nhietdoEntry = {
          timestamp: timestamp / 1000,
          created_at: convertToVietnamTime(entry.created_at),
          nhietdo: parseFloat(entry.field2)
        };
        database.nhietdo.push(nhietdoEntry);
      }

      if (entry.field3 && entry.field3 !== '0') {
        var doamEntry = {
          timestamp: timestamp / 1000,
          created_at: convertToVietnamTime(entry.created_at),
          doam: parseFloat(entry.field3)
        };
        database.doam.push(doamEntry);
      }
    });
    fs.writeFile('C:\\WebServer\\database.json', JSON.stringify(database, null, 2), function (err) {
      if (err) {
        console.error('Lỗi khi lưu file:', err);
      } else {
        console.log('Dữ liệu đã được lưu vào database.json');
      }
    });
  })["catch"](function (error) {
    return console.error("Lỗi khi lấy dữ liệu:", error);
  });
}

function loop() {
  getData();
  setInterval(getData, 5000);
}

module.exports = loop;
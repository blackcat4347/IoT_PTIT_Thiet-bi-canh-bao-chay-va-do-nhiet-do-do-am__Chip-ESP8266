const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Đảm bảo bạn đã cài đặt node-fetch hoặc một thư viện tương tự

const apiKey = "PCGSX1024GXGFYA2";
const channelID = "2384827";

const startTime = "2023-12-23T00:00:00Z"; // Tương ứng 22:00 ngày 20/12 theo giờ Việt Nam
const endTime = "2023-12-23T23:59:59Z"; // 23:59:59 GMT ngày 23/12

function convertToVietnamTime(utcTime) {
  const utcDate = new Date(utcTime);
  utcDate.setHours(utcDate.getHours() + 7);
  return utcDate.toISOString();
}

function getData() {
  const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&start=${startTime}&end=${endTime}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const feeds = data.feeds;
      const database = {
        tialua: [], // Dùng để lưu trữ dữ liệu tia lửa
        nhietdo: [], // Dùng để lưu trữ dữ liệu nhiệt độ
        doam: [] // Dùng để lưu trữ dữ liệu độ ẩm
      };

      console.log('Đã lấy được dữ liệu');

      feeds.forEach((entry) => {
        const timestamp = Date.parse(entry.created_at);
        
        // Chỉ thêm vào mảng tialua nếu field1 không phải là '0'
        if (entry.field1 && entry.field1 !== '0') {
          const tialuaEntry = {
            timestamp: timestamp / 1000,
            created_at: convertToVietnamTime(entry.created_at),
            tialua: parseFloat(entry.field1)
          };
          database.tialua.push(tialuaEntry);
        }

        // Tương tự cho nhietdo và doam
        if (entry.field2 && entry.field2 !== '0') {
          const nhietdoEntry = {
            timestamp: timestamp / 1000,
            created_at: convertToVietnamTime(entry.created_at),
            nhietdo: parseFloat(entry.field2)
          };
          database.nhietdo.push(nhietdoEntry);
        }

        if (entry.field3 && entry.field3 !== '0') {
          const doamEntry = {
            timestamp: timestamp / 1000,
            created_at: convertToVietnamTime(entry.created_at),
            doam: parseFloat(entry.field3)
          };
          database.doam.push(doamEntry);
        }
      });

      fs.writeFile('C:\\WebServer\\database.json', JSON.stringify(database, null, 2), (err) => {
        if (err) {
          console.error('Lỗi khi lưu file:', err);
        } else {
          console.log('Dữ liệu đã được lưu vào database.json');
        }
      });
    })
    .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
}

function loop() {
  getData();
  setInterval(getData, 5000);
}

module.exports = loop;

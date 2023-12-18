const fs = require('fs');

const apiKey = "OKM2KQ2UH4WVNP2R";
const channelID = "2357457";

const startTime = "2023-12-04T00:00:00Z"; // Tương ứng 22:00 ngày 3/12 theo giờ Việt Nam
const endTime = "2023-12-05T23:59:59Z";// 23:59:59 GMT ngày 4/12

function convertToVietnamTime(utcTime) {
  // Tạo một đối tượng Date từ thời gian UTC
  const utcDate = new Date(utcTime);
  
  // Cộng thêm 7 giờ cho múi giờ Việt Nam (UTC+7)
  utcDate.setHours(utcDate.getHours() + 7);

  // Chuyển đổi thành chuỗi định dạng
  const vietnamTime = utcDate.toISOString();
  
  return vietnamTime;
}

function getData() {
  const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&start=${startTime}&end=${endTime}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const feeds = data.feeds;
      const database = {
        khigas: [],
        nhietdo: [],
        doam: [],
        dudoankhigas: [],
        dudoannhietdo: [],
        dudoandoam: []
      };

      // Lọc và biến đổi dữ liệu
      feeds.forEach((entry) => {
        const timestamp = Date.parse(entry.created_at);
        const formattedEntry = {
          timestamp: timestamp / 1000, // Chia 1000 để chuyển đổi sang giây
          created_at: convertToVietnamTime(entry.created_at),
        };

        if (entry.field1 !== null) {
          formattedEntry.khigas = parseFloat(entry.field1); // Đổi field1 thành khigas
          database.khigas.push(formattedEntry);
        }

        if (entry.field2 !== null) {
          formattedEntry.nhietdo = parseFloat(entry.field2); // Đổi field2 thành nhietdo
          database.nhietdo.push(formattedEntry);
        }

        if (entry.field3 !== null) {
          formattedEntry.doam = parseFloat(entry.field3); // Đổi field3 thành doam
          database.doam.push(formattedEntry);
        }
      });

      // Lưu dữ liệu vào tệp database.json
      fs.writeFile('database.json', JSON.stringify(database, null, 2), (err) => {
        if (err) {
          console.error('Lỗi:', err);
        } else {
          console.log('Dữ liệu đã được lưu vào database.json');
        }
      });
    })
    .catch((error) => console.error("Lỗi:", error));
}

// Gọi hàm getData ban đầu
function loop(){
  getData();
  setInterval(getData, 5000);
}
 
module.exports = loop;


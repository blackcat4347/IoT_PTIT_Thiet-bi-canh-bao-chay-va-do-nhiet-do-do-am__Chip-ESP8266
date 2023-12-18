const fetch = require('node-fetch');
const fs = require('fs');

const apiKey = 'OKM2KQ2UH4WVNP2R';
const channelID = '2357457';

const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&start=2023-12-02%2000:00:00&end=2023-12-03%2000:00:00`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Xử lý dữ liệu ở đây
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('output.json', jsonData, 'utf-8');
    console.log('Dữ liệu đã được xuất ra file: output.txt');
  })
  .catch(error => console.error('Lỗi:', error));

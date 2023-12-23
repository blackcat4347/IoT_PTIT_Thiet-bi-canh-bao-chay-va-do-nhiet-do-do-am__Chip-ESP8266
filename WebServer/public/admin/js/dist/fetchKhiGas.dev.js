"use strict";

function getData() {
  fetch('http://localhost:3000/khigas').then(function (response) {
    return response.json();
  }).then(function (data) {
    var feeds = data;
    console.log(feeds); // Lọc ra các mục cụ thể có dữ liệu khiGas

    var dates = feeds.map(function (feed) {
      return feed.created_at;
    });
    var khiGasValues = feeds.map(function (feed) {
      return Number(feed.khiGas);
    });
    var trace1 = {
      x: dates,
      y: khiGasValues,
      type: "scatter",
      mode: "lines+markers",
      // Sử dụng chế độ này để vẽ cả đường và điểm
      marker: {
        color: 'blue',
        size: 8
      },
      line: {
        color: 'blue',
        width: 2
      }
    };
    var dataPlotly = [trace1];
    var layout = {
      title: "Biểu Đồ Khí Gas",
      xaxis: {
        title: "Thời Gian"
      },
      yaxis: {
        title: "Khí Gas"
      },
      showlegend: false
    };
    Plotly.newPlot("myDiv", dataPlotly, layout);
  })["catch"](function (error) {
    return console.error("Lỗi:", error);
  });
}

getData(); // Gọi lại hàm getData sau mỗi giây

setInterval(getData, 5000);
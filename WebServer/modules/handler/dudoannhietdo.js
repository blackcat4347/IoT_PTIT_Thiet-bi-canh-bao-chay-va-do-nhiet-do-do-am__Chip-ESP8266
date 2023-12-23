const { exec } = require('child_process');

const pythonScriptPath = 'C:\\WebServer\\modules\\handler\\dulieunhietdohuanluyen.py'; // Đường dẫn đến tệp Python

async function dudoannhietdo() {
  const child = await exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Lỗi: ${error.message}`);
          return;
      }
      console.log(`Kết quả: ${stdout}`);
      console.error(`Lỗi tiêu chuẩn: ${stderr}`);
  });
  child.on('close', (code) => {
      console.log(`Tiến trình Python đã kết thúc với mã thoát ${code}`);
  });
}

// dudoannhietdo()
module.exports = dudoannhietdo;
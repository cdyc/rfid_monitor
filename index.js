let SerialPort = require("serialport"); //引入模块
let lib = require("./config");
let port = new SerialPort(lib.portName, lib.config, false);

port.open((e) => {
  console.log(port.path + " 端口打开成功。");
  let preStr = "";
  port.on("data", function (data) {
    let str = data.toString("ascii");
    str = str.replace(/\r|\n|\@|\&|\*/g, "");
    if (str.length > 0) {
      // 卡号不足12位时，继续拼接字符串
      if (preStr.length < 12) {
        preStr += str;
      } else {
        preStr = str;
      }

      // 卡号12位时，读取完毕
      if (preStr.length === 12) {
        console.log("读取卡号：", preStr);
      }
    }
  });
});

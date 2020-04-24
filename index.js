let SerialPort = require("serialport"); //引入模块
let lib = require("./config");
let port = new SerialPort(lib.portName, lib.config, false);
const { exec } = require("child_process");

const clipboard = (str) => {
  exec("clip").stdin.end(str);
};

port.open((e) => {
  console.log(port.path + " 端口打开成功。");
  let res = "";
  port.on("data", function (data) {
    let str = data.toString("ascii");
    str = str.replace(/\r|\n|\@|\&|\*/g, "");
    if (str.length > 0) {
      // 卡号不足12位时，继续拼接字符串
      if (res.length < 12) {
        res += str;
      } else {
        res = str;
      }

      // 卡号12位时，读取完毕
      if (res.length === 12) {
        console.log("读取卡号：", res);
        clipboard(res);
      }
    }
  });
});

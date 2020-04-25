let SerialPort = require("serialport"); //引入模块
let fs = require("fs");
var ini = require("ini");

const { exec } = require("child_process");
var ks = require("node-key-sender");

var readFile = function () {
  var lib = ini.parse(fs.readFileSync("config.ini", "utf-8"));
  lib.baudRate = Number(lib.baudRate || "9600");
  lib.dataBits = Number(lib.dataBits || "8");
  lib.stopBits = Number(lib.stopBits || "1");
  return lib;
};

var lib = readFile();
let port = new SerialPort(lib.port, lib, false);

const clipboard = (str) => {
  exec("clip").stdin.end(str);
  // 粘贴
  ks.sendCombination(["control", "v"]);
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

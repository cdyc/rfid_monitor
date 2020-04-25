let SerialPort = require("serialport"); //引入模块
let Readline = require("@serialport/parser-readline");
let parser = new Readline();

let fs = require("fs");
let ini = require("ini");

const { exec } = require("child_process");
let ks = require("node-key-sender");

let readFile = function () {
  let lib = ini.parse(fs.readFileSync("config.ini", "utf-8"));
  lib.baudRate = Number(lib.baudRate || "9600");
  lib.dataBits = Number(lib.dataBits || "8");
  lib.stopBits = Number(lib.stopBits || "1");
  return lib;
};

let lib = readFile();
let port = new SerialPort(lib.port, lib, false);

const clipboard = (str) => {
  exec("clip").stdin.end(str);
  // 粘贴
  ks.sendCombination(["control", "v"]);
};

port.pipe(parser);

port.open(function () {
  console.log(port.path + " 端口打开成功。", new Date());
});

parser.on("data", function (str) {
  str = str.replace(/\r|\n|\@|\&|\*/g, "");
  console.log("读取卡号：", str);
  clipboard(str);
});

// Open errors will be emitted as an error event
port.on("error", function (err) {
  console.log("Error: ", err.message);
});

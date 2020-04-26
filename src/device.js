let SerialPort = require("serialport"); //引入模块
let Readline = require("@serialport/parser-readline");
let parser = new Readline();
let clipboard = require("./clipboard").default;

module.exports.init = function (lib) {
  let port = new SerialPort(lib.port, lib, false);

  port.pipe(parser);

  port.open(function (e) {
    if (e) console.log(e.message);

    console.log("\r\n\r\n" + port.path + " 端口打开成功。", new Date());
  });

  parser.on("data", function (str) {
    str = str.replace(/\r|\n|\@|\&|\*/g, "");
    console.log(new Date(), "读取卡号：", str);
    clipboard(str);
  });

  // Open errors will be emitted as an error event
  port.on("error", function (err) {
    console.log("Error: ", err.message);
  });

  return port;
};

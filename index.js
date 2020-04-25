let SerialPort = require("serialport"); //引入模块
let lib = require("./src/config").config;
let device = require("./src/device");

SerialPort.list().then((ports) => {
  // 默认
  let res = ports[0];

  let portInfo = {
    端口号: res.path,
    厂家: res.manufacturer,
    序列号: res.serialNumber,
    pnpId: res.pnpId,
    vendorId: res.vendorId,
    产品id: res.productId,
  };
  console.log("监测到以下端口：\r\n", portInfo);

  lib.port = lib.port || res.path;

  device.init(lib);
});

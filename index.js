let SerialPort = require("serialport"); //引入模块
let lib = require("./src/config").config;
let device = require("./src/device");

const init = async (inited) => {
  // 端口列表
  let ports = await SerialPort.list();
  if (ports.length === 0) {
    console.log(new Date(), "未监测到COM端口连接");
    return false;
  }

  if (inited) {
    return true;
  }

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
  return true;
};

let inited = 0;
setInterval(async () => {
  // 轮询查询端口状态，自动重连
  inited = await init(inited);
}, 10 * 1000);

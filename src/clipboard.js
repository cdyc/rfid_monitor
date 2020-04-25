const { exec } = require("child_process");
let ks = require("node-key-sender");

module.exports.default = function (str) {
  exec("clip").stdin.end(str);
  // 粘贴
  ks.sendCombination(["control", "v"]);
};

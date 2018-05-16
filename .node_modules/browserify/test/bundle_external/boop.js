var robot = require('./robot.js');
var trex = require('t-rex');

module.exports = function (n) { return robot(n) * trex };

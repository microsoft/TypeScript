// @lib: es5,node
// @target: es5

import fs = require("fs");
import Console = require("console");

var myLog = new Console.Console(fs.createWriteStream(".\Output"));
myLog.log("Logging to myLog");
myLog.trace("show me the trace");

console.log("No Error using node console");
console.log(`Current Directory ${process.cwd()}`);
console.error("Report error");

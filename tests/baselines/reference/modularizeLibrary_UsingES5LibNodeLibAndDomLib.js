//// [modularizeLibrary_UsingES5LibNodeLibAndDomLib.ts]

import fs = require("fs");
import Console = require("console");

var myLog = new Console.Console(fs.createWriteStream(".\Output"));
myLog.log("Logging to myLog");
myLog.trace("show me the trace");

console.log("No Error using node console");
console.log(`Current Directory ${process.cwd()}`);
console.error("Report error");


//// [modularizeLibrary_UsingES5LibNodeLibAndDomLib.js]
"use strict";
var fs = require("fs");
var Console = require("console");
var myLog = new Console.Console(fs.createWriteStream(".\Output"));
myLog.log("Logging to myLog");
myLog.trace("show me the trace");
console.log("No Error using node console");
console.log("Current Directory " + process.cwd());
console.error("Report error");

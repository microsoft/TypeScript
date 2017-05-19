//// [tests/cases/compiler/nodeResolution1.ts] ////

//// [a.ts]
export var x = 1;

//// [b.ts]
import y = require("./a");

//// [a.js]
"use strict";
exports.__esModule = true;
exports.x = 1;
//// [b.js]
"use strict";
exports.__esModule = true;

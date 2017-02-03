//// [tests/cases/compiler/nodeResolution1.ts] ////

//// [a.ts]

export var x = 1;

//// [b.ts]
import y = require("./a");

//// [a.js]
"use strict";
exports.x = 1;
exports.__esModule = true;
//// [b.js]
"use strict";

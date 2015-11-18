//// [tests/cases/compiler/nodeResolution1.ts] ////

//// [a.ts]

export var x = 1;

//// [b.ts]
import y = require("./a");

//// [a.js]
exports.x = 1;
//// [b.js]

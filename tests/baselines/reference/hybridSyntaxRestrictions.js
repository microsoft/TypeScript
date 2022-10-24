//// [tests/cases/conformance/moduleResolution/hybrid/hybridSyntaxRestrictions.ts] ////

//// [index.d.ts]
declare var require: (...args: any[]) => any;

//// [a.ts]
export {};

//// [mainJs.js]
import {} from "./a";
const _ = require("./a"); // No resolution

//// [main.ts]
import {} from "./a";
import _ = require("./a"); // Error
export = {}; // Error
export {};


//// [a.js]
"use strict";
exports.__esModule = true;
//// [main.js]
"use strict";
module.exports = {};

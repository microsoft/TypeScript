//// [tests/cases/conformance/moduleResolution/hybrid/hybridSyntaxRestrictions.ts] ////

//// [index.d.ts]
declare var require: (...args: any[]) => any;

//// [mainJs.js]
import {} from "./a";
import("./a");
const _ = require("./a"); // No resolution
_.a; // any

//// [main.ts]
import {} from "./a";
import _ = require("./a"); // Error
export = {}; // Error
export {};

//// [a.ts]
export const a = "a";


//// [a.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = "a";
//// [mainJs.js]
"use strict";
exports.__esModule = true;
Promise.resolve().then(function () { return require("./a"); });
var _ = require("./a"); // No resolution
_.a; // any
//// [main.js]
"use strict";
module.exports = {};

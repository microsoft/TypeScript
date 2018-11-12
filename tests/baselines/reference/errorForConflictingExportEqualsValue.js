//// [a.ts]
export var x;
export = x;
import("./a");


//// [a.js]
"use strict";
Promise.resolve().then(function () { return require("./a"); });
module.exports = exports.x;

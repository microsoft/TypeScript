//// [tests/cases/compiler/errorForConflictingExportEqualsValue.ts] ////

//// [a.ts]
export var x;
export = x;
import("./a");


//// [a.js]
"use strict";
exports.x = void 0;
Promise.resolve().then(() => require("./a"));
module.exports = x;

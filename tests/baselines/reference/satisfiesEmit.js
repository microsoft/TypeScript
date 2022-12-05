//// [satisfiesEmit.ts]
// This import should not be elided in the emitted JS
import a = require("foo");
const p = a satisfies bleh;


//// [satisfiesEmit.js]
"use strict";
exports.__esModule = true;
// This import should not be elided in the emitted JS
var a = require("foo");
var p = a;

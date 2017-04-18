//// [tests/cases/conformance/moduleResolution/packageJsonMain_isNonRecursive.ts] ////

//// [package.json]
{ "main": "oof" }

//// [package.json]
{ "main": "ofo" }

//// [ofo.js]
module.exports = 0;

//// [a.ts]
import foo = require("foo");


//// [a.js]
"use strict";
exports.__esModule = true;

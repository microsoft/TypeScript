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
Object.defineProperty(exports, "__esModule", { value: true });

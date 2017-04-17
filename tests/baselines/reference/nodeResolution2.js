//// [tests/cases/compiler/nodeResolution2.ts] ////

//// [a.d.ts]
export var x: number;

//// [b.ts]
import y = require("a");

//// [b.js]
"use strict";
exports.__esModule = true;

//// [tests/cases/compiler/nodeResolution3.ts] ////

//// [index.d.ts]
export var x: number;

//// [a.ts]
import y = require("b");

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

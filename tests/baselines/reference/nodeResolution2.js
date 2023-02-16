//// [tests/cases/compiler/nodeResolution2.ts] ////

//// [index.d.ts]
export var x: number;

//// [b.ts]
import y = require("a");


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

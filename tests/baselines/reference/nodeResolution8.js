//// [tests/cases/compiler/nodeResolution8.ts] ////

//// [ref.ts]
var x = 1;

//// [index.d.ts]
/// <reference path="ref.ts"/>
export declare var y;


//// [b.ts]
import y = require("a");

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

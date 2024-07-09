//// [tests/cases/compiler/nodeResolution6.ts] ////

//// [ref.ts]
var x = 1;

//// [a.d.ts]
/// <reference path="ref.ts"/>
export declare var y;


//// [b.ts]
import y = require("a"); 


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

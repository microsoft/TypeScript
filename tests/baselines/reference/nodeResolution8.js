//// [tests/cases/compiler/nodeResolution8.ts] ////

//// [ref.ts]

var x = 1;

//// [index.d.ts]
/// <reference path="ref.ts"/>
export declare var y;


//// [b.ts]
import y = require("a");

//// [ref.js]
var x = 1;
//// [b.js]
"use strict";

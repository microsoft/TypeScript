//// [tests/cases/compiler/nodeResolution6.ts] ////

//// [ref.ts]

var x = 1;

//// [a.d.ts]
/// <reference path="ref.ts"/>
export declare var y;


//// [b.ts]
import y = require("a"); 


//// [ref.js]
var x = 1;
//// [b.js]
"use strict";

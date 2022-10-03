//// [tests/cases/compiler/nodeResolution7.ts] ////

//// [index.d.ts]
declare module "a" {
    var x: number;
}

//// [b.ts]
import y = require("a"); 


//// [b.js]
"use strict";
exports.__esModule = true;

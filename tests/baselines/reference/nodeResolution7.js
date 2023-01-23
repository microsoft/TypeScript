//// [tests/cases/compiler/nodeResolution7.ts] ////

//// [index.d.ts]
declare module "a" {
    var x: number;
}

//// [b.ts]
import y = require("a"); 


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

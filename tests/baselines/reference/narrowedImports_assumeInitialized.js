//// [tests/cases/compiler/narrowedImports_assumeInitialized.ts] ////

//// [a.d.ts]
declare namespace a {
    export const x: number;
}
export = a;

//// [b.ts]
import a = require("./a");
a.x;


//// [b.js]
"use strict";
exports.__esModule = true;
var a = require("./a");
a.x;

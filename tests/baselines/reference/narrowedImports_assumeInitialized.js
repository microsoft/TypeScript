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
Object.defineProperty(exports, "__esModule", { value: true });
var a = require("./a");
a.x;

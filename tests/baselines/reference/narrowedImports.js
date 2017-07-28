//// [tests/cases/compiler/narrowedImports.ts] ////

//// [a.d.ts]
declare const a0: number | undefined;
export default a0;
export const a1: number | undefined;

//// [b.d.ts]
declare const b: number | undefined;
declare namespace b {}
export = b;

//// [x.ts]
import a0, { a1, a1 as a2 } from "./a";
import * as b0 from "./b";
import b1 = require("./b");

let x: number;

if (a0) x = a0;
if (a1) x = a1;
if (a2) x = a2;
if (b0) x = b0;
if (b1) x = b1;


//// [x.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var b0 = require("./b");
var b1 = require("./b");
var x;
if (a_1["default"])
    x = a_1["default"];
if (a_1.a1)
    x = a_1.a1;
if (a_1.a1)
    x = a_1.a1;
if (b0)
    x = b0;
if (b1)
    x = b1;

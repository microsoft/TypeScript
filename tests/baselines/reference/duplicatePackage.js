//// [tests/cases/compiler/duplicatePackage.ts] ////

//// [index.d.ts]
import X from "x";
export function a(x: X): void;

//// [index.d.ts]
export default class X {
    private x: number;
}

//// [package.json]
{ "name": "x", "version": "1.2.3" }

//// [index.d.ts]
import X from "x";
export const b: X;

//// [index.d.ts]
content not parsed

//// [package.json]
{ "name": "x", "version": "1.2.3" }

//// [index.d.ts]
import X from "x";
export const c: X;

//// [index.d.ts]
export default class X {
    private x: number;
}

//// [package.json]
{ "name": "x", "version": "1.2.4" }

//// [a.ts]
import { a } from "a";
import { b } from "b";
import { c } from "c";
a(b); // Works
a(c); // Error, these are from different versions of the library.


//// [a.js]
"use strict";
exports.__esModule = true;
var a_1 = require("a");
var b_1 = require("b");
var c_1 = require("c");
(0, a_1.a)(b_1.b); // Works
(0, a_1.a)(c_1.c); // Error, these are from different versions of the library.

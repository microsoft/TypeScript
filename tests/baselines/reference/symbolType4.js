//// [tests/cases/conformance/es6/Symbols/symbolType4.ts] ////

//// [symbolType4.ts]
var s = Symbol.for("postfix");
s++;
s--;

//// [symbolType4.js]
"use strict";
var s = Symbol.for("postfix");
s++;
s--;

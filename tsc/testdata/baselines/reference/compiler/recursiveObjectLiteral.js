//// [tests/cases/compiler/recursiveObjectLiteral.ts] ////

//// [recursiveObjectLiteral.ts]
var a = { f: a };

//// [recursiveObjectLiteral.js]
"use strict";
var a = { f: a };

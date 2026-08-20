//// [tests/cases/compiler/objectLiteralWithSemicolons5.ts] ////

//// [objectLiteralWithSemicolons5.ts]
var v = { foo() { }; a: b; get baz() { }; }

//// [objectLiteralWithSemicolons5.js]
"use strict";
var v = { foo() { }, a: b, get baz() { }, };

//// [tests/cases/compiler/letAsIdentifierInStrictMode.ts] ////

//// [letAsIdentifierInStrictMode.ts]
"use strict";
var let = 10;
var a = 10;
let = 30;
let
a;

//// [letAsIdentifierInStrictMode.js]
"use strict";
var let = 10;
var a = 10;
let = 30;
var a;

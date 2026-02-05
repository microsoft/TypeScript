//// [tests/cases/compiler/constEnumBadPropertyNames.ts] ////

//// [constEnumBadPropertyNames.ts]
const enum E { A }
var x = E["B"]

//// [constEnumBadPropertyNames.js]
"use strict";
var x = E["B"];

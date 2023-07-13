//// [tests/cases/compiler/constEnumBadPropertyNames.ts] ////

//// [constEnumBadPropertyNames.ts]
const enum E { A }
var x = E["B"]

//// [constEnumBadPropertyNames.js]
var x = E["B"];

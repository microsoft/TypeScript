//// [tests/cases/compiler/doNotEmitTripleSlashCommentsInTheMiddle.ts] ////

//// [0.ts]


//// [1.ts]
/// <reference path="0.ts" />
var x = 10;
/// <reference path="0.ts" />
var y = 1000;

//// [0.js]
//// [1.js]
var x = 10;
var y = 1000;

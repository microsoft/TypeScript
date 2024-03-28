//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionAsIs.ts] ////

//// [emitArrowFunctionAsIs.ts]
var arrow1 = a => { };
var arrow2 = (a) => { };

var arrow3 = (a, b) => { };

//// [emitArrowFunctionAsIs.js]
var arrow1 = function (a) { };
var arrow2 = function (a) { };
var arrow3 = function (a, b) { };

//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionsAsIs.ts] ////

//// [emitArrowFunctionsAsIs.ts]
var arrow1 = a => { };
var arrow2 = (a) => { };

var arrow3 = (a, b) => { };

//// [emitArrowFunctionsAsIs.js]
var arrow1 = a => { };
var arrow2 = (a) => { };
var arrow3 = (a, b) => { };

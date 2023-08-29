//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionsAsIsES6.ts] ////

//// [emitArrowFunctionsAsIsES6.ts]
var arrow1 =  a => { };
var arrow2 = (a) => { };

var arrow3 = (a, b) => { };

//// [emitArrowFunctionsAsIsES6.js]
var arrow1 = a => { };
var arrow2 = (a) => { };
var arrow3 = (a, b) => { };

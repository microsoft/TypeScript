//// [emitArrowFunctionsAsIs.ts]
var arrow1 = a => { };
var arrow2 = (a) => { };

var arrow3 = (a, b) => { };

//// [emitArrowFunctionsAsIs.js]
var arrow1 = function arrow1(a) { };
var arrow2 = function arrow2(a) { };
var arrow3 = function arrow3(a, b) { };

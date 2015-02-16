//// [emitArrowFunctionsAsIs.ts]
var arrow1 = a => { };
var arrow2 = (a) => { };

var arrow3 = (a, b) => { };

//// [emitArrowFunctionsAsIs.js]
var arrow1 = function (a) { };
var arrow2 = function (a) { };
var arrow3 = function (a, b) { };

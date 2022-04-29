//// [fatArrowfunctionAsType.ts]
declare var b: <T>(x: T) => void ;

var c: <T>(x: T) => void = function <T>(x: T) { return 42; }

b = c;


//// [fatArrowfunctionAsType.js]
var c = function (x) { return 42; };
b = c;

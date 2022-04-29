//// [templateStringInUnaryPlus.ts]
var x = +`abc${ 123 }def`;

//// [templateStringInUnaryPlus.js]
var x = +"abc".concat(123, "def");

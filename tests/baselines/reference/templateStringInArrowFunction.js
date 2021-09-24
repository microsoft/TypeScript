//// [templateStringInArrowFunction.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunction.js]
var x = function x_1(x) { return "abc" + x + "def"; };

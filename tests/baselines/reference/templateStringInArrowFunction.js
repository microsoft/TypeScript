//// [templateStringInArrowFunction.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunction.js]
var x = function x(x) { return "abc" + x + "def"; };

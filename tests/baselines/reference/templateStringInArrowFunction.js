//// [templateStringInArrowFunction.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunction.js]
var x = function (x) { return "abc".concat(x, "def"); };

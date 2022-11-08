//// [templateStringInMultiplication.ts]
var x = 1 * `abc${ 1 }def`;

//// [templateStringInMultiplication.js]
var x = 1 * "abc".concat(1, "def");

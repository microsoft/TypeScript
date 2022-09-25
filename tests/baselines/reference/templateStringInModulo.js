//// [templateStringInModulo.ts]
var x = 1 % `abc${ 1 }def`;

//// [templateStringInModulo.js]
var x = 1 % "abc".concat(1, "def");

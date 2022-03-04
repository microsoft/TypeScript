//// [templateStringWithEmbeddedDivision.ts]
var x = `abc${ 1 / 1 }def`;

//// [templateStringWithEmbeddedDivision.js]
var x = "abc".concat(1 / 1, "def");

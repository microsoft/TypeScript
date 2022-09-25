//// [templateStringInDivision.ts]
var x = `abc${ 1 }def` / 1;

//// [templateStringInDivision.js]
var x = "abc".concat(1, "def") / 1;

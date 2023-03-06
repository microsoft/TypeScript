//// [templateStringInInstanceOf.ts]
var x = `abc${ 0 }def` instanceof String;

//// [templateStringInInstanceOf.js]
var x = "abc".concat(0, "def") instanceof String;

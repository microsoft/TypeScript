//// [templateStringInArray.ts]
var x = [1, 2, `abc${ 123 }def`];

//// [templateStringInArray.js]
var x = [1, 2, "abc".concat(123, "def")];

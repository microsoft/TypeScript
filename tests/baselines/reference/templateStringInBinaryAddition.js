//// [templateStringInBinaryAddition.ts]
var x = 10 + `abc${ 10 }def`;

//// [templateStringInBinaryAddition.js]
var x = 10 + ("abc" + 10 + "def");

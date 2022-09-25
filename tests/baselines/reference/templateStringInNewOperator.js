//// [templateStringInNewOperator.ts]
var x = new `abc${ 1 }def`;

//// [templateStringInNewOperator.js]
var x = new ("abc".concat(1, "def"));

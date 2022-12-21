//// [templateStringWithEmbeddedTypeOfOperator.ts]
var x = `abc${ typeof "hi" }def`;

//// [templateStringWithEmbeddedTypeOfOperator.js]
var x = "abc".concat(typeof "hi", "def");

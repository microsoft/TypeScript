//// [templateStringWithEmbeddedInOperator.ts]
var x = `abc${ "hi" in { hi: 10, hello: 20} }def`;

//// [templateStringWithEmbeddedInOperator.js]
var x = "abc".concat("hi" in { hi: 10, hello: 20 }, "def");

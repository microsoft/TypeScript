//// [templateStringWithEmbeddedTypeAssertionOnAddition.ts]
var x = `abc${ <any>(10 + 10) }def`;

//// [templateStringWithEmbeddedTypeAssertionOnAddition.js]
var x = "abc".concat((10 + 10), "def");

//// [templateStringWithEmbeddedObjectLiteral.ts]
var x = `abc${ { x: 10, y: 20 } }def`;

//// [templateStringWithEmbeddedObjectLiteral.js]
var x = "abc" + { x: 10, y: 20 } + "def";

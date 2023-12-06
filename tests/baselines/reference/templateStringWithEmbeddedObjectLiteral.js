//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedObjectLiteral.ts] ////

//// [templateStringWithEmbeddedObjectLiteral.ts]
var x = `abc${ { x: 10, y: 20 } }def`;

//// [templateStringWithEmbeddedObjectLiteral.js]
var x = "abc".concat({ x: 10, y: 20 }, "def");

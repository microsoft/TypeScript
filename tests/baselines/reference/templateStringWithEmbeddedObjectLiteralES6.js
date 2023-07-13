//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedObjectLiteralES6.ts] ////

//// [templateStringWithEmbeddedObjectLiteralES6.ts]
var x = `abc${ { x: 10, y: 20 } }def`;

//// [templateStringWithEmbeddedObjectLiteralES6.js]
var x = `abc${{ x: 10, y: 20 }}def`;

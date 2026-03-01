//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedObjectLiteral.ts] ////

//// [templateStringWithEmbeddedObjectLiteral.ts]
var x = `abc${ { x: 10, y: 20 } }def`;

//// [templateStringWithEmbeddedObjectLiteral.js]
"use strict";
var x = `abc${{ x: 10, y: 20 }}def`;

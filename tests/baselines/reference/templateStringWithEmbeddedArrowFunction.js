//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArrowFunction.ts] ////

//// [templateStringWithEmbeddedArrowFunction.ts]
var x = `abc${ x => x }def`;

//// [templateStringWithEmbeddedArrowFunction.js]
var x = `abc${x => x}def`;

//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArrowFunctionES6.ts] ////

//// [templateStringWithEmbeddedArrowFunctionES6.ts]
var x = `abc${ x => x }def`;

//// [templateStringWithEmbeddedArrowFunctionES6.js]
var x = `abc${x => x}def`;

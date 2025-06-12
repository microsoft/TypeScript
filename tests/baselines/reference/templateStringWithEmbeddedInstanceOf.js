//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedInstanceOf.ts] ////

//// [templateStringWithEmbeddedInstanceOf.ts]
var x = `abc${ "hello" instanceof String }def`;

//// [templateStringWithEmbeddedInstanceOf.js]
var x = `abc${"hello" instanceof String}def`;

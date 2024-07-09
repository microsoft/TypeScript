//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedFunctionExpressionES6.ts] ////

//// [templateStringWithEmbeddedFunctionExpressionES6.ts]
var x = `abc${ function y() { return y; } }def`;

//// [templateStringWithEmbeddedFunctionExpressionES6.js]
var x = `abc${function y() { return y; }}def`;

//// [tests/cases/conformance/es6/templates/templateStringInConditionalES6.ts] ////

//// [templateStringInConditionalES6.ts]
var x = `abc${ " " }def` ? `abc${ " " }def` : `abc${ " " }def`;

//// [templateStringInConditionalES6.js]
var x = `abc${" "}def` ? `abc${" "}def` : `abc${" "}def`;

//// [tests/cases/conformance/es6/templates/templateStringInConditional.ts] ////

//// [templateStringInConditional.ts]
var x = `abc${ " " }def` ? `abc${ " " }def` : `abc${ " " }def`;

//// [templateStringInConditional.js]
var x = `abc${" "}def` ? `abc${" "}def` : `abc${" "}def`;

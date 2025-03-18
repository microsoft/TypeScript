//// [tests/cases/conformance/es6/templates/templateStringInPropertyName1.ts] ////

//// [templateStringInPropertyName1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyName1.js]
var x = {} `a`;
321;

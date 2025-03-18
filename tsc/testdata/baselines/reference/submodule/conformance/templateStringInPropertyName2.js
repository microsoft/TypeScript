//// [tests/cases/conformance/es6/templates/templateStringInPropertyName2.ts] ////

//// [templateStringInPropertyName2.ts]
var x = {
    `abc${ 123 }def${ 456 }ghi`: 321
}

//// [templateStringInPropertyName2.js]
var x = {} `abc${123}def${456}ghi`;
321;

//// [tests/cases/conformance/es6/templates/templateStringInObjectLiteralES6.ts] ////

//// [templateStringInObjectLiteralES6.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteralES6.js]
var x = {
    a: `abc${123}def`,
} `b`;
321;

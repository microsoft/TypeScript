//// [tests/cases/conformance/es6/templates/templateStringInObjectLiteral.ts] ////

//// [templateStringInObjectLiteral.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteral.js]
var x = {
    a: `abc${123}def`,
} `b`;
321;

//// [tests/cases/conformance/es6/templates/templateStringInEqualityChecksES6.ts] ////

//// [templateStringInEqualityChecksES6.ts]
var x = `abc${0}abc` === `abc` ||
        `abc` !== `abc${0}abc` &&
        `abc${0}abc` == "abc0abc" &&
        "abc0abc" !== `abc${0}abc`;

//// [templateStringInEqualityChecksES6.js]
var x = `abc${0}abc` === `abc` ||
    `abc` !== `abc${0}abc` &&
        `abc${0}abc` == "abc0abc" &&
        "abc0abc" !== `abc${0}abc`;

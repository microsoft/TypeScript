//// [tests/cases/conformance/es6/templates/templateStringInEqualityChecks.ts] ////

//// [templateStringInEqualityChecks.ts]
var x = `abc${0}abc` === `abc` ||
        `abc` !== `abc${0}abc` &&
        `abc${0}abc` == "abc0abc" &&
        "abc0abc" !== `abc${0}abc`;

//// [templateStringInEqualityChecks.js]
var x = "abc".concat(0, "abc") === "abc" ||
    "abc" !== "abc".concat(0, "abc") &&
        "abc".concat(0, "abc") == "abc0abc" &&
        "abc0abc" !== "abc".concat(0, "abc");

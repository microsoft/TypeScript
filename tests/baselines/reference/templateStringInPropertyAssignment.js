//// [tests/cases/conformance/es6/templates/templateStringInPropertyAssignment.ts] ////

//// [templateStringInPropertyAssignment.ts]
var x = {
    a: `abc${ 123 }def${ 456 }ghi`
}

//// [templateStringInPropertyAssignment.js]
var x = {
    a: "abc".concat(123, "def").concat(456, "ghi")
};

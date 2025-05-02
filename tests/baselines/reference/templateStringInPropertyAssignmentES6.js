//// [tests/cases/conformance/es6/templates/templateStringInPropertyAssignmentES6.ts] ////

//// [templateStringInPropertyAssignmentES6.ts]
var x = {
    a: `abc${ 123 }def${ 456 }ghi`
}

//// [templateStringInPropertyAssignmentES6.js]
var x = {
    a: `abc${123}def${456}ghi`
};

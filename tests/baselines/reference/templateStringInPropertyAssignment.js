//// [tests/cases/conformance/es6/templates/templateStringInPropertyAssignment.ts] ////

//// [templateStringInPropertyAssignment.ts]
var x = {
    a: `abc${ 123 }def${ 456 }ghi`
}

//// [templateStringInPropertyAssignment.js]
"use strict";
var x = {
    a: `abc${123}def${456}ghi`
};

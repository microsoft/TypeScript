//// [tests/cases/conformance/es6/destructuring/destructuringAssignabilityCheck.ts] ////

//// [destructuringAssignabilityCheck.ts]
const [] = {}; // should be error
const {} = undefined; // error correctly
(([]) => 0)({}); // should be error
(({}) => 0)(undefined); // should be error

function foo({}: undefined) {
    return 0
}
function bar([]: {}) {
    return 0
}

const { }: undefined = 1

const []: {} = {}


//// [destructuringAssignabilityCheck.js]
"use strict";
var _a = {}; // should be error
var _b = undefined; // error correctly
(function (_a) { return 0; })({}); // should be error
(function (_a) { return 0; })(undefined); // should be error
function foo(_a) {
    return 0;
}
function bar(_a) {
    return 0;
}
var _c = 1;
var _d = {};

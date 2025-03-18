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
const [] = {};
const {} = undefined;
(([]) => 0)({});
(({}) => 0)(undefined);
function foo({}) {
    return 0;
}
function bar([]) {
    return 0;
}
const {} = 1;
const [] = {};

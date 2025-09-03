//// [tests/cases/conformance/es7/exponentiationOperator/compoundExponentiationAssignmentLHSIsReference.ts] ////

//// [compoundExponentiationAssignmentLHSIsReference.ts]
var value: any;

// identifiers: variable and parameter
var x1: number;
x1 **= value;

function fn1(x2: number) {
    x2 **= value;
}

// property accesses
var x3: { a: number };
x3.a **= value;

x3['a'] **= value;

// parentheses, the contained expression is reference
(x1) **= value;

function fn2(x4: number) {
    (x4) **= value;
}

(x3.a) **= value;

(x3['a']) **= value;

//// [compoundExponentiationAssignmentLHSIsReference.js]
var value;
// identifiers: variable and parameter
var x1;
x1 **= value;
function fn1(x2) {
    x2 **= value;
}
// property accesses
var x3;
x3.a **= value;
x3['a'] **= value;
// parentheses, the contained expression is reference
(x1) **= value;
function fn2(x4) {
    (x4) **= value;
}
(x3.a) **= value;
(x3['a']) **= value;

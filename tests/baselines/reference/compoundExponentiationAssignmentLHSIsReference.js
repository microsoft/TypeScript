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
var _a, _b, _c;
var value;
// identifiers: variable and parameter
var x1;
x1 = Math.pow(x1, value);
function fn1(x2) {
    x2 = Math.pow(x2, value);
}
// property accesses
var x3;
(_a = x3).a = Math.pow(_a.a, value);
(_b = x3)[_c = 'a'] = Math.pow(_b[_c], value);
// parentheses, the contained expression is reference
(x1) = Math.pow((x1), value);
function fn2(x4) {
    (x4) = Math.pow((x4), value);
}
(x3.a) = Math.pow((x3.a), value);
(x3['a']) = Math.pow((x3['a']), value);

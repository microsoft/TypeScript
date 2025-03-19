//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithNullValueAndValidOperands.ts] ////

//// [exponentiationOperatorWithNullValueAndValidOperands.ts]
// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.

enum E {
    a,
    b
}

var a: any;
var b: number;

// operator **
var r1 = null ** a;
var r2 = null ** b;
var r3 = null ** 1;
var r4 = null ** E.a;
var r5 = a ** null;
var r6 = b ** null;
var r7 = 0 ** null;
var r8 = E.b ** null;

//// [exponentiationOperatorWithNullValueAndValidOperands.js]
// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var a;
var b;
// operator **
var r1 = null ** a;
var r2 = null ** b;
var r3 = null ** 1;
var r4 = null ** E.a;
var r5 = a ** null;
var r6 = b ** null;
var r7 = 0 ** null;
var r8 = E.b ** null;

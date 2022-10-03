//// [exponentiationOperatorWithUndefinedValueAndValidOperands.ts]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.

enum E {
    a,
    b
}

var a: any;
var b: number;

// operator *
var rk1 = undefined ** a;
var rk2 = undefined ** b;
var rk3 = undefined ** 1;
var rk4 = undefined ** E.a;
var rk5 = a ** undefined;
var rk6 = b ** undefined;
var rk7 = 0 ** undefined;
var rk8 = E.b ** undefined;

//// [exponentiationOperatorWithUndefinedValueAndValidOperands.js]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var a;
var b;
// operator *
var rk1 = Math.pow(undefined, a);
var rk2 = Math.pow(undefined, b);
var rk3 = Math.pow(undefined, 1);
var rk4 = Math.pow(undefined, E.a);
var rk5 = Math.pow(a, undefined);
var rk6 = Math.pow(b, undefined);
var rk7 = Math.pow(0, undefined);
var rk8 = Math.pow(E.b, undefined);

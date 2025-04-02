//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithEnum.ts] ////

//// [exponentiationOperatorWithEnum.ts]
// operands of an enum type are treated as having the primitive type Number.

enum E {
    a,
    b
}

var a: any;
var b: number;
var c: E;

// operator **
var r1 = c ** a;
var r2 = c ** b;
var r3 = c ** c;
var r4 = a ** c;
var r5 = b ** c;
var r6 = E.a ** a;
var r7 = E.a ** b;
var r8 = E.a ** E.b;
var r9 = E.a ** 1;
var r10 = a ** E.b;
var r11 = b ** E.b;
var r12 = 1 ** E.b;

//// [exponentiationOperatorWithEnum.js]
// operands of an enum type are treated as having the primitive type Number.
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var a;
var b;
var c;
// operator **
var r1 = Math.pow(c, a);
var r2 = Math.pow(c, b);
var r3 = Math.pow(c, c);
var r4 = Math.pow(a, c);
var r5 = Math.pow(b, c);
var r6 = Math.pow(E.a, a);
var r7 = Math.pow(E.a, b);
var r8 = Math.pow(E.a, E.b);
var r9 = Math.pow(E.a, 1);
var r10 = Math.pow(a, E.b);
var r11 = Math.pow(b, E.b);
var r12 = Math.pow(1, E.b);

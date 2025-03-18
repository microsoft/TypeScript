//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithEnumUnion.ts] ////

//// [exponentiationOperatorWithEnumUnion.ts]
// operands of an enum type are treated as having the primitive type Number.

enum E {
    a,
    b
}
enum F {
    c,
    d
}

var a: any;
var b: number;
var c: E | F;

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

//// [exponentiationOperatorWithEnumUnion.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var F;
(function (F) {
    F[F["c"] = 0] = "c";
    F[F["d"] = 1] = "d";
})(F || (F = {}));
var a;
var b;
var c;
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

//// [tests/cases/conformance/expressions/binaryOperators/additionOperator/additionOperatorWithNumberAndEnum.ts] ////

//// [additionOperatorWithNumberAndEnum.ts]
enum E { a, b }
enum F { c, d }

var a: number;
var b: E;
var c: E | F;

var r1 = a + a;
var r2 = a + b;
var r3 = b + a;
var r4 = b + b;

var r5 = 0 + a;
var r6 = E.a + 0;
var r7 = E.a + E.b;
var r8 = E['a'] + E['b'];
var r9 = E['a'] + F['c'];

var r10 = a + c;
var r11 = c + a;
var r12 = b + c;
var r13 = c + b;
var r14 = c + c;


//// [additionOperatorWithNumberAndEnum.js]
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
var r1 = a + a;
var r2 = a + b;
var r3 = b + a;
var r4 = b + b;
var r5 = 0 + a;
var r6 = E.a + 0;
var r7 = E.a + E.b;
var r8 = E['a'] + E['b'];
var r9 = E['a'] + F['c'];
var r10 = a + c;
var r11 = c + a;
var r12 = b + c;
var r13 = c + b;
var r14 = c + c;

//// [tests/cases/compiler/enumNaNValues.ts] ////

//// [enumNaNValues.ts]
enum E {
  A = NaN,
  B = NaN,
}

const a: E.A = E.B;
const b: E.B = E.A;

enum F {
  X = NaN,
}

const c: E.A = F.X; // Error expected - different enums


//// [enumNaNValues.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = NaN] = "A";
    E[E["B"] = NaN] = "B";
})(E || (E = {}));
const a = E.B;
const b = E.A;
var F;
(function (F) {
    F[F["X"] = NaN] = "X";
})(F || (F = {}));
const c = F.X; // Error expected - different enums

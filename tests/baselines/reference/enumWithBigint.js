//// [tests/cases/compiler/enumWithBigint.ts] ////

//// [enumWithBigint.ts]
enum E {
  0n = 0,
}


//// [enumWithBigint.js]
var E;
(function (E) {
    E[E[0n] = 0] = 0n;
})(E || (E = {}));

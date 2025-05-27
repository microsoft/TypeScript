//// [tests/cases/compiler/enumWithBugint.ts] ////

//// [enumWithBugint.ts]
enum E {
  0n = 0,
}


//// [enumWithBugint.js]
var E;
(function (E) {
    E[E[0n] = 0] = 0n;
})(E || (E = {}));

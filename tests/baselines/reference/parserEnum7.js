//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnum7.ts] ////

//// [parserEnum7.ts]
enum E {
  1, 2, 3
}

//// [parserEnum7.js]
var E;
(function (E) {
    E[E[1] = 0] = 1;
    E[E[2] = 1] = 2;
    E[E[3] = 2] = 3;
})(E || (E = {}));

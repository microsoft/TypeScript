//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnum6.ts] ////

//// [parserEnum6.ts]
enum E {
  "A", "B", "C"
}

//// [parserEnum6.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));

//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnum5.ts] ////

//// [parserEnum5.ts]
enum E2 { a, }
enum E3 { a: 1, }
enum E1 { a, b: 1, c, d: 2 = 3 }

//// [parserEnum5.js]
var E2;
(function (E2) {
    E2[E2["a"] = 0] = "a";
})(E2 || (E2 = {}));
var E3;
(function (E3) {
    E3[E3["a"] = 0] = "a";
    E3[E3[1] = 1] = 1;
})(E3 || (E3 = {}));
var E1;
(function (E1) {
    E1[E1["a"] = 0] = "a";
    E1[E1["b"] = 1] = "b";
    E1[E1[1] = 2] = 1;
    E1[E1["c"] = 3] = "c";
    E1[E1["d"] = 4] = "d";
    E1[E1[2] = 3] = 2;
})(E1 || (E1 = {}));

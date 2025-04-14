//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnumDeclaration1.ts] ////

//// [parserEnumDeclaration1.ts]
enum E {
  Foo = 1,
  Bar
}

//// [parserEnumDeclaration1.js]
var E;
(function (E) {
    E[E["Foo"] = 1] = "Foo";
    E[E["Bar"] = 2] = "Bar";
})(E || (E = {}));

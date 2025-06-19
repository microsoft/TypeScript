//// [tests/cases/compiler/jsFileCompilationEnumSyntax.ts] ////

//// [a.js]
enum E { }

//// [a.js]
var E;
(function (E) {
})(E || (E = {}));

//// [tests/cases/compiler/typeOfEnumAndVarRedeclarations.ts] ////

//// [typeOfEnumAndVarRedeclarations.ts]
enum E {
    a
}
enum E {
    b = 1
}
var x = E;
var x: { readonly a: E; readonly b: E; readonly [x: number]: string; }; // Shouldnt error
var y = E;
var y: { readonly a: E; readonly b: E; readonly [x: number]: string; readonly [x: number]: string } // two errors: the types are not identical and duplicate signatures

//// [typeOfEnumAndVarRedeclarations.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));
(function (E) {
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var x = E;
var x; // Shouldnt error
var y = E;
var y; // two errors: the types are not identical and duplicate signatures

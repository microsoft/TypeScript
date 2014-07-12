//// [typeOfEnumAndVarRedeclarations.ts]
enum E {
    a
}
enum E {
    b = 1
}
var x = E;
var x: { a: E; b: E;[x: number]: string; }; // Shouldnt error
var y = E;
var y: { a: E; b: E;[x: number]: string;[x: number]: string } // two errors: the types are not identical and duplicate signatures

//// [typeOfEnumAndVarRedeclarations.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));
var E;
(function (E) {
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var x = E;
var x;
var y = E;
var y;

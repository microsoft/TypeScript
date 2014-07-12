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
var y; // two errors: the types are not identical and duplicate signatures

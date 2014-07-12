//// [enumsWithMultipleDeclarations2.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));

var E;
(function (E) {
    E[E["B"] = 1] = "B";
})(E || (E = {}));

var E;
(function (E) {
    E[E["C"] = 0] = "C";
})(E || (E = {}));

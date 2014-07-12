//// [duplicateLocalVariable4.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));

var x = E;
var x = 0 /* a */;

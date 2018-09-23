//// [augmentedTypesEnum3.ts]
module E {
    var t;
}
enum E { }

enum F { }
module F { var t; }

module A {
    var o;
}
enum A {
    b
}
enum A {
    c
}
module A {
    var p;
}

//// [augmentedTypesEnum3.js]
var E = E || (E = {});
(function (E) {
    var t;
})(E);
(function (E) {
})(E);
var F = F || (F = {});
(function (F) {
})(F);
(function (F) {
    var t;
})(F);
var A = A || (A = {});
(function (A) {
    var o;
})(A);
(function (A) {
    A[A["b"] = 0] = "b";
})(A);
(function (A) {
    A[A["c"] = 0] = "c";
})(A);
(function (A) {
    var p;
})(A);

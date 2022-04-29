//// [enumWithInfinityProperty.ts]
enum A {
    Infinity = 1
}


//// [enumWithInfinityProperty.js]
var A;
(function (A) {
    A[A["Infinity"] = 1] = "Infinity";
})(A || (A = {}));

//// [enumWithNaNProperty.ts]
enum A {
    NaN = 1
}


//// [enumWithNaNProperty.js]
var A = A || (A = {});
(function (A) {
    A[A["NaN"] = 1] = "NaN";
})(A);

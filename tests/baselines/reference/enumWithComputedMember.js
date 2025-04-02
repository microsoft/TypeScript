//// [tests/cases/compiler/enumWithComputedMember.ts] ////

//// [enumWithComputedMember.ts]
enum A { 
    X = "".length, 
    Y = X,
    Z
}


//// [enumWithComputedMember.js]
var A;
(function (A) {
    A[A["X"] = "".length] = "X";
    A[A["Y"] = A.X] = "Y";
    A[A["Z"] = void 0] = "Z";
})(A || (A = {}));

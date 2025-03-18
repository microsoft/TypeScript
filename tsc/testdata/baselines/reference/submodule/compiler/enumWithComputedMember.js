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
    var auto;
    A["X"] = "".length;
    if (typeof A.X !== "string") A[A.X] = "X";
    A[A["Y"] = auto = A.X] = "Y";
    A[A["Z"] = ++auto] = "Z";
})(A || (A = {}));

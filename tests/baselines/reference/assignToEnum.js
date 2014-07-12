//// [assignToEnum.js]
var A;
(function (A) {
    A[A["foo"] = 0] = "foo";
    A[A["bar"] = 1] = "bar";
})(A || (A = {}));
A = undefined; // invalid LHS
A = 1 /* bar */; // invalid LHS
0 /* foo */ = 1; // invalid LHS
0 /* foo */ = 1 /* bar */; // invalid LHS

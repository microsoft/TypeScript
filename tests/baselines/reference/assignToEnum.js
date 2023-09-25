//// [tests/cases/compiler/assignToEnum.ts] ////

//// [assignToEnum.ts]
enum A { foo, bar }
A = undefined;  // invalid LHS
A = A.bar;      // invalid LHS
A.foo = 1;      // invalid LHS
A.foo = A.bar;  // invalid LHS



//// [assignToEnum.js]
var A;
(function (A) {
    A[A["foo"] = 0] = "foo";
    A[A["bar"] = 1] = "bar";
})(A || (A = {}));
A = undefined; // invalid LHS
A = A.bar; // invalid LHS
A.foo = 1; // invalid LHS
A.foo = A.bar; // invalid LHS

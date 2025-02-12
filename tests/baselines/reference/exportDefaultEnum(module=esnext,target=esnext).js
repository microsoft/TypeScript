//// [tests/cases/compiler/exportDefaultEnum.ts] ////

//// [a.ts]
export default enum A {
    A,
    B
}

//// [b.ts]
import A from "./a"

A.A;
A.B;


//// [a.js]
var A = {};
export default A;
(function (A) {
    A[A["A"] = 0] = "A";
    A[A["B"] = 1] = "B";
})(A);
//// [b.js]
import A from "./a";
A.A;
A.B;

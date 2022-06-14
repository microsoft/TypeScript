//// [tests/cases/compiler/exportDefaultModule.ts] ////

//// [a.ts]
export default module A {
    export const Foo = 1;
}

//// [b.ts]
import A from "./a"
A.Foo;


//// [a.js]
var A = {};
export default A;
(function (A) {
    A.Foo = 1;
})(A);
//// [b.js]
import A from "./a";
A.Foo;

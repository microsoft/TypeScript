//// [tests/cases/compiler/moduleClassArrayCodeGenTest.ts] ////

//// [moduleClassArrayCodeGenTest.ts]
// Invalid code gen for Array of Module class

module M
{
    export class A { }
    class B{ }
}

var t: M.A[] = [];
var t2: M.B[] = [];

//// [moduleClassArrayCodeGenTest.js]
var M;
(function (M) {
    class A {
    }
    M.A = A;
    class B {
    }
})(M || (M = {}));
var t = [];
var t2 = [];

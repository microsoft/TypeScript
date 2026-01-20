//// [tests/cases/compiler/genericFunduleInModule.ts] ////

//// [genericFunduleInModule.ts]
namespace A {
    export function B<T>(x: T) { return x; }
    export namespace B {
        export var x = 1;
    }
}

var b: A.B;
A.B(1);

//// [genericFunduleInModule.js]
var A;
(function (A) {
    function B(x) { return x; }
    A.B = B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
A.B(1);

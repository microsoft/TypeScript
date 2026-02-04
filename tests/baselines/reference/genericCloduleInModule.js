//// [tests/cases/compiler/genericCloduleInModule.ts] ////

//// [genericCloduleInModule.ts]
namespace A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
    export namespace B {
        export var x = 1;
    }
}

var b: A.B<number>;
b.foo();

//// [genericCloduleInModule.js]
"use strict";
var A;
(function (A) {
    class B {
        foo() { }
        static bar() { }
    }
    A.B = B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
b.foo();

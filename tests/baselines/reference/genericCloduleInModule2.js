//// [tests/cases/compiler/genericCloduleInModule2.ts] ////

//// [genericCloduleInModule2.ts]
namespace A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
}

namespace A {
    export namespace B {
        export var x = 1;
    }
}

var b: A.B;
b.foo();

//// [genericCloduleInModule2.js]
"use strict";
var A;
(function (A) {
    class B {
        foo() { }
        static bar() { }
    }
    A.B = B;
})(A || (A = {}));
(function (A) {
    let B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
b.foo();

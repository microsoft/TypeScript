//// [tests/cases/compiler/genericCloduleInModule.ts] ////

//// [genericCloduleInModule.ts]
module A {
    export class B<T> {
        foo() { }
        static bar() { }
    }
    export module B {
        export var x = 1;
    }
}

var b: A.B<number>;
b.foo();

//// [genericCloduleInModule.js]
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

//// [tests/cases/compiler/superAccessInFatArrow1.ts] ////

//// [superAccessInFatArrow1.ts]
namespace test {
    export class A {
        foo() {
        }
    }
    export class B extends A {
        bar(callback: () => void ) {
        }
        runme() {
            this.bar(() => {
                super.foo();
            });
        }
    }
}

//// [superAccessInFatArrow1.js]
"use strict";
var test;
(function (test) {
    class A {
        foo() {
        }
    }
    test.A = A;
    class B extends A {
        bar(callback) {
        }
        runme() {
            this.bar(() => {
                super.foo();
            });
        }
    }
    test.B = B;
})(test || (test = {}));

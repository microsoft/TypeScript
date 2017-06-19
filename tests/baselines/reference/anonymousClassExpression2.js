//// [anonymousClassExpression2.ts]
// Fixes #14860
// note: repros with `while (0);` too
// but it's less inscrutable and more obvious to put it *inside* the loop
while (0) {
    class A {
        methodA() {
            this; //note: a this reference of some kind is required to trigger the bug
        }
    }

    class B {
        methodB() {
            this.methodA; // error
            this.methodB; // ok
        }
    }
}


//// [anonymousClassExpression2.js]
// Fixes #14860
// note: repros with `while (0);` too
// but it's less inscrutable and more obvious to put it *inside* the loop
while (0) {
    var A = /** @class */ (function () {
        function A() {
        }
        A.prototype.methodA = function () {
            this; //note: a this reference of some kind is required to trigger the bug
        };
        return A;
    }());
    var B = /** @class */ (function () {
        function B() {
        }
        B.prototype.methodB = function () {
            this.methodA; // error
            this.methodB; // ok
        };
        return B;
    }());
}

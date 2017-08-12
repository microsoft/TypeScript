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
    var A = (function () {
        function A() {
        }
        var proto_1 = A.prototype;
        proto_1.methodA = function () {
            this; //note: a this reference of some kind is required to trigger the bug
        };
        return A;
    }());
    var B = (function () {
        function B() {
        }
        var proto_2 = B.prototype;
        proto_2.methodB = function () {
            this.methodA; // error
            this.methodB; // ok
        };
        return B;
    }());
}

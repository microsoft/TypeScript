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
    var B = (function () {
        function B() {
        }
        var proto_1 = B.prototype;
        proto_1.foo = function () { };
        B.bar = function () { };
        return B;
    }());
    A.B = B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
b.foo();

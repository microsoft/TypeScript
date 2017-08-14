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
    var B = /** @class */ (function () {
        function B() {
        }
        B.prototype.foo = function () { };
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

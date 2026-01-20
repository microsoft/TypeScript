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
})(A || (A = {}));
(function (A) {
    var B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b;
b.foo();

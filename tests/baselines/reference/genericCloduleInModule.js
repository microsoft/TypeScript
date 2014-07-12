//// [genericCloduleInModule.ts]
// BUG 756210
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
// BUG 756210
var A;
(function (A) {
    var B = (function () {
        function B() {
        }
        B.prototype.foo = function () {
        };
        B.bar = function () {
        };
        return B;
    })();
    A.B = B;
    (function (B) {
        B.x = 1;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var b;
b.foo();

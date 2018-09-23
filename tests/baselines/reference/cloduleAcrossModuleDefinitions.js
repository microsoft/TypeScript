//// [cloduleAcrossModuleDefinitions.ts]
module A {
    export class B {
        foo() { }
        static bar() { }
    }
}

module A {
    export module B {
        export var x = 1;
    }
}

var b: A.B; // ok


//// [cloduleAcrossModuleDefinitions.js]
var A = A || (A = {});
(function (A) {
    var B = /** @class */ (function () {
        function B() {
        }
        B.prototype.foo = function () { };
        B.bar = function () { };
        return B;
    }());
    A.B = B;
})(A);
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        B.x = 1;
    })(B);
})(A);
var b; // ok

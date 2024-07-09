//// [tests/cases/compiler/cloduleAcrossModuleDefinitions.ts] ////

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
var b; // ok

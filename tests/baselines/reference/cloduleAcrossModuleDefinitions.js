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
})(A || (A = {}));

var A;
(function (A) {
    (function (B) {
        B.x = 1;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var b;

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
        var proto_1 = B.prototype;
        proto_1.foo = function () { };
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

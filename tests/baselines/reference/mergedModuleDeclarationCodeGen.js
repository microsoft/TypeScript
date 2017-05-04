//// [mergedModuleDeclarationCodeGen.ts]
export module X {
    export module Y {
        class A {
            constructor(Y: any) {
                new B();
            }
        }
    }
}
export module X {
    export module Y {
        export class B {
        }
    }
}

//// [mergedModuleDeclarationCodeGen.js]
"use strict";
exports.__esModule = true;
var X;
(function (X) {
    var Y;
    (function (Y_1) {
        var A = (function () {
            function A(Y) {
                new Y_1.B();
            }
            return A;
        }());
    })(Y = X.Y || (X.Y = {}));
})(X = exports.X || (exports.X = {}));
(function (X) {
    var Y;
    (function (Y) {
        var B = (function () {
            function B() {
            }
            return B;
        }());
        Y.B = B;
    })(Y = X.Y || (X.Y = {}));
})(X = exports.X || (exports.X = {}));

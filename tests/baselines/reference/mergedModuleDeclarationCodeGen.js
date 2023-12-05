//// [tests/cases/compiler/mergedModuleDeclarationCodeGen.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
var X;
(function (X) {
    var Y;
    (function (Y_1) {
        var A = /** @class */ (function () {
            function A(Y) {
                new Y_1.B();
            }
            return A;
        }());
    })(Y = X.Y || (X.Y = {}));
})(X || (exports.X = X = {}));
(function (X) {
    var Y;
    (function (Y) {
        var B = /** @class */ (function () {
            function B() {
            }
            return B;
        }());
        Y.B = B;
    })(Y = X.Y || (X.Y = {}));
})(X || (exports.X = X = {}));

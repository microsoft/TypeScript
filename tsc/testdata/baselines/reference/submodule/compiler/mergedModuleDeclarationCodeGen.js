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
    let Y;
    (function (Y_1) {
        class A {
            constructor(Y) {
                new B();
            }
        }
    })(Y = X.Y || (X.Y = {}));
})(X || (exports.X = X = {}));
(function (X) {
    let Y;
    (function (Y) {
        class B {
        }
        Y.B = B;
    })(Y = X.Y || (X.Y = {}));
})(X || (exports.X = X = {}));

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
var X;
(function (X) {
    var Y;
    (function (_Y) {
        var A = (function () {
            function A(Y) {
                new _Y.B();
            }
            return A;
        })();
    })(Y = X.Y || (X.Y = {}));
})(X = exports.X || (exports.X = {}));
var X;
(function (X) {
    var Y;
    (function (Y) {
        var B = (function () {
            function B() {
            }
            return B;
        })();
        Y.B = B;
    })(Y = X.Y || (X.Y = {}));
})(X = exports.X || (exports.X = {}));

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
(function (X) {
    (function (_Y) {
        var A = (function () {
            function A(Y) {
                new _Y.B();
            }
            return A;
        })();
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(exports.X || (exports.X = {}));
var X = exports.X;
(function (X) {
    (function (Y) {
        var B = (function () {
            function B() {
            }
            return B;
        })();
        Y.B = B;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(exports.X || (exports.X = {}));
var X = exports.X;

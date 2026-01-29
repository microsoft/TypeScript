//// [tests/cases/compiler/mergedModuleDeclarationCodeGen.ts] ////

//// [mergedModuleDeclarationCodeGen.ts]
export namespace X {
    export namespace Y {
        class A {
            constructor(Y: any) {
                new B();
            }
        }
    }
}
export namespace X {
    export namespace Y {
        export class B {
        }
    }
}

//// [mergedModuleDeclarationCodeGen.js]
export var X;
(function (X) {
    let Y;
    (function (Y_1) {
        class A {
            constructor(Y) {
                new Y_1.B();
            }
        }
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    let Y;
    (function (Y) {
        class B {
        }
        Y.B = B;
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));

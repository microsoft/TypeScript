//// [tests/cases/compiler/classDeclarationMergedInModuleWithContinuation.ts] ////

//// [classDeclarationMergedInModuleWithContinuation.ts]
module M {
    export class N { }
    export module N {
        export var v = 0;
    }
}

module M {
    export class O extends M.N {
    }
}

//// [classDeclarationMergedInModuleWithContinuation.js]
var M;
(function (M) {
    class N {
    }
    M.N = N;
    (function (N) {
        N.v = 0;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    class O extends M.N {
    }
    M.O = O;
})(M || (M = {}));

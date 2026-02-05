//// [tests/cases/compiler/classDeclarationMergedInModuleWithContinuation.ts] ////

//// [classDeclarationMergedInModuleWithContinuation.ts]
namespace M {
    export class N { }
    export namespace N {
        export var v = 0;
    }
}

namespace M {
    export class O extends M.N {
    }
}

//// [classDeclarationMergedInModuleWithContinuation.js]
"use strict";
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

//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt.ts]
namespace Z.M {
    export function bar() {
        return "";
    }
}
namespace A.M {
    import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt.js]
"use strict";
var Z;
(function (Z) {
    let M;
    (function (M) {
        function bar() {
            return "";
        }
        M.bar = bar;
    })(M = Z.M || (Z.M = {}));
})(Z || (Z = {}));
var A;
(function (A) {
    let M;
    (function (M_1) {
        var M = Z.M;
        function bar() {
        }
        M_1.bar = bar;
        M.bar(); // Should call Z.M.bar
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

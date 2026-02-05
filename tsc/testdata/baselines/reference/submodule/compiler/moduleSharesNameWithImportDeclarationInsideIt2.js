//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt2.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt2.ts]
namespace Z.M {
    export function bar() {
        return "";
    }
}
namespace A.M {
    export import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt2.js]
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
    (function (M) {
        M.M = Z.M;
        function bar() {
        }
        M.bar = bar;
        M.M.bar(); // Should call Z.M.bar
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

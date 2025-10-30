//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt6.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt6.ts]
namespace Z.M {
    export function bar() {
        return "";
    }
}
namespace A.M {
    import M = Z.M;
    export function bar() {
    }
}

//// [moduleSharesNameWithImportDeclarationInsideIt6.js]
var Z;
(function (Z) {
    var M;
    (function (M) {
        function bar() {
            return "";
        }
        M.bar = bar;
    })(M = Z.M || (Z.M = {}));
})(Z || (Z = {}));
var A;
(function (A) {
    var M;
    (function (M_1) {
        function bar() {
        }
        M_1.bar = bar;
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

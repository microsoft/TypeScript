//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt5.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt5.ts]
namespace Z {
    export namespace M {
        export function bar() {
            return "";
        }
    }
    export interface I { }
}
namespace A.M {
    import M = Z.I;
    import M = Z.M;

    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt5.js]
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
        M.bar(); // Should call Z.M.bar
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

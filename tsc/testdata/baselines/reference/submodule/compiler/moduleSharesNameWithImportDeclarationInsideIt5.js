//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt5.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt5.ts]
module Z {
    export module M {
        export function bar() {
            return "";
        }
    }
    export interface I { }
}
module A.M {
    import M = Z.I;
    import M = Z.M;

    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt5.js]
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
        var M = Z.I;
        var M = Z.M;
        function bar() {
        }
        M_1.bar = bar;
        M.bar(); // Should call Z.M.bar
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

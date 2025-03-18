//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt3.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt3.ts]
module Z {
    export module M {
        export function bar() {
            return "";
        }
    }
    export interface I { }
}
module A.M {
    import M = Z.M;
    import M = Z.I;

    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt3.js]
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
        var M = Z.I;
        function bar() {
        }
        M_1.bar = bar;
        M.bar();
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

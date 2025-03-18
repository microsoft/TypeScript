//// [tests/cases/compiler/moduleSharesNameWithImportDeclarationInsideIt6.ts] ////

//// [moduleSharesNameWithImportDeclarationInsideIt6.ts]
module Z.M {
    export function bar() {
        return "";
    }
}
module A.M {
    import M = Z.M;
    export function bar() {
    }
}

//// [moduleSharesNameWithImportDeclarationInsideIt6.js]
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
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

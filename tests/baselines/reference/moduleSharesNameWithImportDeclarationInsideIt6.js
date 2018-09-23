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
var Z = Z || (Z = {});
(function (Z) {
    var M = Z.M || (Z.M = {});
    (function (M) {
        function bar() {
            return "";
        }
        M.bar = bar;
    })(M);
})(Z);
var A = A || (A = {});
(function (A) {
    var M = A.M || (A.M = {});
    (function (M_1) {
        function bar() {
        }
        M_1.bar = bar;
    })(M);
})(A);

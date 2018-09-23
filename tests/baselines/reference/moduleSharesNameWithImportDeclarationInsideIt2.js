//// [moduleSharesNameWithImportDeclarationInsideIt2.ts]
module Z.M {
    export function bar() {
        return "";
    }
}
module A.M {
    export import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt2.js]
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
    (function (M) {
        M.M = Z.M;
        function bar() {
        }
        M.bar = bar;
        M.M.bar(); // Should call Z.M.bar
    })(M);
})(A);

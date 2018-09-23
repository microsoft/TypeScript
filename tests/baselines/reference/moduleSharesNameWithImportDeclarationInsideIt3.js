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
        var M = Z.M;
        function bar() {
        }
        M_1.bar = bar;
        M.bar(); // Should call Z.M.bar
    })(M);
})(A);

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
    (function (_M) {
        var M = Z.M;
        function bar() {
        }
        _M.bar = bar;
        M.bar(); // Should call Z.M.bar
    })(M = A.M || (A.M = {}));
})(A || (A = {}));

//// [moduleSharesNameWithImportDeclarationInsideIt4.ts]
module Z.M {
    export function bar() {
        return "";
    }
}
module A.M {
    interface M { }
    import M = Z.M;
    export function bar() {
    }
    M.bar(); // Should call Z.M.bar
}

//// [moduleSharesNameWithImportDeclarationInsideIt4.js]
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

//// [collisionCodeGenModuleWithFunctionChildren.ts]
module M {
    export var x = 3;
    function fn(M, p = x) { }
}

module M {
    function fn2() {
        var M;
        var p = x;
    }
}

module M {
    function fn3() {
        function M() {
            var p = x;
        }
    }
}

//// [collisionCodeGenModuleWithFunctionChildren.js]
var M;
(function (M) {
    M.x = 3;
    function fn(M, p) {
        if (p === void 0) { p = M.x; }
    }
})(M || (M = {}));
var M;
(function (M) {
    function fn2() {
        var M;
        var p = M.x;
    }
})(M || (M = {}));
var M;
(function (M) {
    function fn3() {
        function M() {
            var p = M.x;
        }
    }
})(M || (M = {}));

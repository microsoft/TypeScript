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
(function (M_1) {
    M_1.x = 3;
    function fn(M, p) {
        if (p === void 0) { p = M_1.x; }
    }
})(M || (M = {}));
(function (M_2) {
    function fn2() {
        var M;
        var p = M_2.x;
    }
})(M || (M = {}));
(function (M_3) {
    function fn3() {
        function M() {
            var p = M_3.x;
        }
    }
})(M || (M = {}));

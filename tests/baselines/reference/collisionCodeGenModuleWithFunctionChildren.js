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
(function (_M) {
    _M.x = 3;
    function fn(M, p) { }
})(M || (M = {}));
var M;
(function (_M_1) {
    function fn2() {
        var M;
        var p = _M_1.x;
    }
})(M || (M = {}));
var M;
(function (_M_2) {
    function fn3() {
        function M() {
            var p = _M_2.x;
        }
    }
})(M || (M = {}));

//// [tests/cases/compiler/collisionCodeGenModuleWithFunctionChildren.ts] ////

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
    function fn(M, p = M_1.x) { }
})(M || (M = {}));
(function (M_1) {
    function fn2() {
        var M;
        var p = x;
    }
})(M || (M = {}));
(function (M_1) {
    function fn3() {
        function M() {
            var p = x;
        }
    }
})(M || (M = {}));

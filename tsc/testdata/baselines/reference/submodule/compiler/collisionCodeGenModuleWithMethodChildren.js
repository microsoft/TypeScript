//// [tests/cases/compiler/collisionCodeGenModuleWithMethodChildren.ts] ////

//// [collisionCodeGenModuleWithMethodChildren.ts]
module M {
    export var x = 3;
    class c {
        fn(M, p = x) { }
    }
}

module M {
    class d {
        fn2() {
            var M;
            var p = x;
        }
    }
}

module M {
    class e {
        fn3() {
            function M() {
                var p = x;
            }
        }
    }
}

module M { // Shouldnt bn _M
    class f {
        M() {
        }
    }
}

//// [collisionCodeGenModuleWithMethodChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    class c {
        fn(M, p = M_1.x) { }
    }
})(M || (M = {}));
(function (M_1) {
    class d {
        fn2() {
            var M;
            var p = x;
        }
    }
})(M || (M = {}));
(function (M_1) {
    class e {
        fn3() {
            function M() {
                var p = x;
            }
        }
    }
})(M || (M = {}));
(function (M) {
    class f {
        M() {
        }
    }
})(M || (M = {}));

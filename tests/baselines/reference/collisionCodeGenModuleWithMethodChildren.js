//// [tests/cases/compiler/collisionCodeGenModuleWithMethodChildren.ts] ////

//// [collisionCodeGenModuleWithMethodChildren.ts]
namespace M {
    export var x = 3;
    class c {
        fn(M, p = x) { }
    }
}

namespace M {
    class d {
        fn2() {
            var M;
            var p = x;
        }
    }
}

namespace M {
    class e {
        fn3() {
            function M() {
                var p = x;
            }
        }
    }
}

namespace M { // Shouldnt bn _M
    class f {
        M() {
        }
    }
}

//// [collisionCodeGenModuleWithMethodChildren.js]
"use strict";
var M;
(function (M_1) {
    M_1.x = 3;
    class c {
        fn(M, p = M_1.x) { }
    }
})(M || (M = {}));
(function (M_2) {
    class d {
        fn2() {
            var M;
            var p = M_2.x;
        }
    }
})(M || (M = {}));
(function (M_3) {
    class e {
        fn3() {
            function M() {
                var p = M_3.x;
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

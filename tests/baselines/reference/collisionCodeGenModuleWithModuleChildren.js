//// [tests/cases/compiler/collisionCodeGenModuleWithModuleChildren.ts] ////

//// [collisionCodeGenModuleWithModuleChildren.ts]
namespace M {
    export var x = 3;
    namespace m1 {
        var M = 10;
        var p = x;
    }
}

namespace M {
    namespace m2 {
        class M {
        }
        var p = x;
        var p2 = new M();
    }
}

namespace M {
    namespace m3 {
        function M() {
        }
        var p = x;
        var p2 = M();
    }
}

namespace M { // shouldnt be _M
    namespace m3 {
        interface M {
        }
        var p = x;
        var p2: M;
    }
}

namespace M {
    namespace m4 {
        namespace M {
            var p = x;
        }
    }
}

//// [collisionCodeGenModuleWithModuleChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    var m1;
    (function (m1) {
        var M = 10;
        var p = M_1.x;
    })(m1 || (m1 = {}));
})(M || (M = {}));
(function (M_2) {
    var m2;
    (function (m2) {
        var M = /** @class */ (function () {
            function M() {
            }
            return M;
        }());
        var p = M_2.x;
        var p2 = new M();
    })(m2 || (m2 = {}));
})(M || (M = {}));
(function (M_3) {
    var m3;
    (function (m3) {
        function M() {
        }
        var p = M_3.x;
        var p2 = M();
    })(m3 || (m3 = {}));
})(M || (M = {}));
(function (M) {
    var m3;
    (function (m3) {
        var p = M.x;
        var p2;
    })(m3 || (m3 = {}));
})(M || (M = {}));
(function (M_4) {
    var m4;
    (function (m4) {
        var M;
        (function (M) {
            var p = M_4.x;
        })(M || (M = {}));
    })(m4 || (m4 = {}));
})(M || (M = {}));

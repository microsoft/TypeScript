//// [tests/cases/compiler/collisionCodeGenModuleWithModuleChildren.ts] ////

//// [collisionCodeGenModuleWithModuleChildren.ts]
module M {
    export var x = 3;
    module m1 {
        var M = 10;
        var p = x;
    }
}

module M {
    module m2 {
        class M {
        }
        var p = x;
        var p2 = new M();
    }
}

module M {
    module m3 {
        function M() {
        }
        var p = x;
        var p2 = M();
    }
}

module M { // shouldnt be _M
    module m3 {
        interface M {
        }
        var p = x;
        var p2: M;
    }
}

module M {
    module m4 {
        module M {
            var p = x;
        }
    }
}

//// [collisionCodeGenModuleWithModuleChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    let m1;
    (function (m1) {
        var M = 10;
        var p = M_1.x;
    })(m1 || (m1 = {}));
})(M || (M = {}));
(function (M_1) {
    let m2;
    (function (m2) {
        class M {
        }
        var p = x;
        var p2 = new M();
    })(m2 || (m2 = {}));
})(M || (M = {}));
(function (M_1) {
    let m3;
    (function (m3) {
        function M() {
        }
        var p = x;
        var p2 = M();
    })(m3 || (m3 = {}));
})(M || (M = {}));
(function (M) {
    let m3;
    (function (m3) {
        var p = x;
        var p2;
    })(m3 || (m3 = {}));
})(M || (M = {}));
(function (M_1) {
    let m4;
    (function (m4) {
        let M;
        (function (M) {
            var p = x;
        })(M || (M = {}));
    })(m4 || (m4 = {}));
})(M || (M = {}));

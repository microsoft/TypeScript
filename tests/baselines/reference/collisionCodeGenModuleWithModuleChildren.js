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
(function (_M) {
    _M.x = 3;
    var m1;
    (function (m1) {
        var M = 10;
        var p = _M.x;
    })(m1 || (m1 = {}));
})(M || (M = {}));

var M;
(function (_M) {
    var m2;
    (function (m2) {
        var M = (function () {
            function M() {
            }
            return M;
        })();
        var p = _M.x;
        var p2 = new M();
    })(m2 || (m2 = {}));
})(M || (M = {}));

var M;
(function (_M) {
    var m3;
    (function (m3) {
        function M() {
        }
        var p = _M.x;
        var p2 = M();
    })(m3 || (m3 = {}));
})(M || (M = {}));

var M;
(function (M) {
    var m3;
    (function (m3) {
        var p = M.x;
        var p2;
    })(m3 || (m3 = {}));
})(M || (M = {}));

var M;
(function (_M) {
    var m4;
    (function (m4) {
        var M;
        (function (M) {
            var p = _M.x;
        })(M || (M = {}));
    })(m4 || (m4 = {}));
})(M || (M = {}));

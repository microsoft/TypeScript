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
    var c = /** @class */ (function () {
        function c() {
        }
        c.prototype.fn = function (M, p) {
            if (p === void 0) { p = M_1.x; }
        };
        return c;
    }());
})(M || (M = {}));
(function (M_2) {
    var d = /** @class */ (function () {
        function d() {
        }
        d.prototype.fn2 = function () {
            var M;
            var p = M_2.x;
        };
        return d;
    }());
})(M || (M = {}));
(function (M_3) {
    var e = /** @class */ (function () {
        function e() {
        }
        e.prototype.fn3 = function () {
            function M() {
                var p = M_3.x;
            }
        };
        return e;
    }());
})(M || (M = {}));
(function (M) {
    var f = /** @class */ (function () {
        function f() {
        }
        f.prototype.M = function () {
        };
        return f;
    }());
})(M || (M = {}));

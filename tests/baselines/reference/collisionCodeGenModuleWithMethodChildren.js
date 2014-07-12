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
(function (M) {
    M.x = 3;
    var c = (function () {
        function c() {
        }
        c.prototype.fn = function (M, p) {
            if (p === void 0) { p = M.x; }
        };
        return c;
    })();
})(M || (M = {}));
var M;
(function (M) {
    var d = (function () {
        function d() {
        }
        d.prototype.fn2 = function () {
            var M;
            var p = M.x;
        };
        return d;
    })();
})(M || (M = {}));
var M;
(function (M) {
    var e = (function () {
        function e() {
        }
        e.prototype.fn3 = function () {
            function M() {
                var p = M.x;
            }
        };
        return e;
    })();
})(M || (M = {}));
var M;
(function (M) {
    var f = (function () {
        function f() {
        }
        f.prototype.M = function () {
        };
        return f;
    })();
})(M || (M = {}));

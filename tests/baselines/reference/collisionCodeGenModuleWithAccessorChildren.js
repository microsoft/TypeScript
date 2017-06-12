//// [collisionCodeGenModuleWithAccessorChildren.ts]
module M {
    export var x = 3;
    class c {
        private y;
        set Z(M) {
            this.y = x;
        }
    }
}

module M {
    class d {
        private y;
        set Z(p) {
            var M = 10;
            this.y = x;
        }
    }
}

module M { // Shouldnt be _M
    class e {
        private y;
        set M(p) {
            this.y = x;
        }
    }
}

module M {
    class f {
        get Z() {
            var M = 10;
            return x;
        }
    }
}

module M { // Shouldnt be _M
    class e {
        get M() {
            return x;
        }
    }
}

//// [collisionCodeGenModuleWithAccessorChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    var c = (function () {
        function c() {
        }
        var proto_1 = c.prototype;
        Object.defineProperty(proto_1, "Z", {
            set: function (M) {
                this.y = M_1.x;
            },
            enumerable: true,
            configurable: true
        });
        return c;
    }());
})(M || (M = {}));
(function (M_2) {
    var d = (function () {
        function d() {
        }
        var proto_2 = d.prototype;
        Object.defineProperty(proto_2, "Z", {
            set: function (p) {
                var M = 10;
                this.y = M_2.x;
            },
            enumerable: true,
            configurable: true
        });
        return d;
    }());
})(M || (M = {}));
(function (M) {
    var e = (function () {
        function e() {
        }
        var proto_3 = e.prototype;
        Object.defineProperty(proto_3, "M", {
            set: function (p) {
                this.y = M.x;
            },
            enumerable: true,
            configurable: true
        });
        return e;
    }());
})(M || (M = {}));
(function (M_3) {
    var f = (function () {
        function f() {
        }
        var proto_4 = f.prototype;
        Object.defineProperty(proto_4, "Z", {
            get: function () {
                var M = 10;
                return M_3.x;
            },
            enumerable: true,
            configurable: true
        });
        return f;
    }());
})(M || (M = {}));
(function (M) {
    var e = (function () {
        function e() {
        }
        var proto_5 = e.prototype;
        Object.defineProperty(proto_5, "M", {
            get: function () {
                return M.x;
            },
            enumerable: true,
            configurable: true
        });
        return e;
    }());
})(M || (M = {}));

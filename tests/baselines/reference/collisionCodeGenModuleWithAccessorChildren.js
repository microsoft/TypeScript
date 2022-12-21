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
    var c = /** @class */ (function () {
        function c() {
        }
        Object.defineProperty(c.prototype, "Z", {
            set: function (M) {
                this.y = M_1.x;
            },
            enumerable: false,
            configurable: true
        });
        return c;
    }());
})(M || (M = {}));
(function (M_2) {
    var d = /** @class */ (function () {
        function d() {
        }
        Object.defineProperty(d.prototype, "Z", {
            set: function (p) {
                var M = 10;
                this.y = M_2.x;
            },
            enumerable: false,
            configurable: true
        });
        return d;
    }());
})(M || (M = {}));
(function (M) {
    var e = /** @class */ (function () {
        function e() {
        }
        Object.defineProperty(e.prototype, "M", {
            set: function (p) {
                this.y = M.x;
            },
            enumerable: false,
            configurable: true
        });
        return e;
    }());
})(M || (M = {}));
(function (M_3) {
    var f = /** @class */ (function () {
        function f() {
        }
        Object.defineProperty(f.prototype, "Z", {
            get: function () {
                var M = 10;
                return M_3.x;
            },
            enumerable: false,
            configurable: true
        });
        return f;
    }());
})(M || (M = {}));
(function (M) {
    var e = /** @class */ (function () {
        function e() {
        }
        Object.defineProperty(e.prototype, "M", {
            get: function () {
                return M.x;
            },
            enumerable: false,
            configurable: true
        });
        return e;
    }());
})(M || (M = {}));

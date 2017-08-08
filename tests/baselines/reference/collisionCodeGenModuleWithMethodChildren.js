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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var M;
(function (M_1) {
    M_1.x = 3;
    var c = (function () {
        function c() {
        }
        c.prototype.fn = function (M, p) {
            if (p === void 0) { p = M_1.x; }
        };
        __names(c.prototype, ["fn"]);
        return c;
    }());
})(M || (M = {}));
(function (M_2) {
    var d = (function () {
        function d() {
        }
        d.prototype.fn2 = function () {
            var M;
            var p = M_2.x;
        };
        __names(d.prototype, ["fn2"]);
        return d;
    }());
})(M || (M = {}));
(function (M_3) {
    var e = (function () {
        function e() {
        }
        e.prototype.fn3 = function () {
            function M() {
                var p = M_3.x;
            }
        };
        __names(e.prototype, ["fn3"]);
        return e;
    }());
})(M || (M = {}));
(function (M) {
    var f = (function () {
        function f() {
        }
        f.prototype.M = function () {
        };
        __names(f.prototype, ["M"]);
        return f;
    }());
})(M || (M = {}));

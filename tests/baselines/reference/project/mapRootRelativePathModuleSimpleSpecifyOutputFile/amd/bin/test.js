define("m1", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.m1_f1 = exports.m1_instance1 = exports.m1_c1 = exports.m1_a1 = void 0;
    exports.m1_a1 = 10;
    var m1_c1 = /** @class */ (function () {
        function m1_c1() {
        }
        return m1_c1;
    }());
    exports.m1_c1 = m1_c1;
    exports.m1_instance1 = new m1_c1();
    function m1_f1() {
        return exports.m1_instance1;
    }
    exports.m1_f1 = m1_f1;
});
define("test", ["require", "exports", "m1"], function (require, exports, m1) {
    "use strict";
    exports.__esModule = true;
    exports.a2 = exports.f1 = exports.instance1 = exports.c1 = exports.a1 = void 0;
    exports.a1 = 10;
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    exports.c1 = c1;
    exports.instance1 = new c1();
    function f1() {
        return exports.instance1;
    }
    exports.f1 = f1;
    exports.a2 = m1.m1_c1;
});
//# sourceMappingURL=../../mapFiles/test.js.map
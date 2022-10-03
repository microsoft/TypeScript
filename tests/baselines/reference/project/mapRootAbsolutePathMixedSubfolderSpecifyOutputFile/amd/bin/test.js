var m1_a1 = 10;
var m1_c1 = /** @class */ (function () {
    function m1_c1() {
    }
    return m1_c1;
}());
var m1_instance1 = new m1_c1();
function m1_f1() {
    return m1_instance1;
}
define("ref/m2", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.m2_f1 = exports.m2_instance1 = exports.m2_c1 = exports.m2_a1 = void 0;
    exports.m2_a1 = 10;
    var m2_c1 = /** @class */ (function () {
        function m2_c1() {
        }
        return m2_c1;
    }());
    exports.m2_c1 = m2_c1;
    exports.m2_instance1 = new m2_c1();
    function m2_f1() {
        return exports.m2_instance1;
    }
    exports.m2_f1 = m2_f1;
});
/// <reference path='ref/m1.ts'/>
/// <reference path='ref/m2.ts'/>
var a1 = 10;
var c1 = /** @class */ (function () {
    function c1() {
    }
    return c1;
}());
var instance1 = new c1();
function f1() {
    return instance1;
}
//# sourceMappingURL=/tests/cases/projects/outputdir_mixed_subfolder/mapFiles/test.js.map
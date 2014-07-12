//// [collisionExportsRequireAndModule.js]
define(["require", "exports"], function(require, exports) {
    (function (require) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        require.C = C;
    })(exports.require || (exports.require = {}));
    var require = exports.require;
    function foo() {
        return null;
    }
    exports.foo = foo;
    (function (exports) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        exports.C = C;
    })(exports.exports || (exports.exports = {}));
    var exports = exports.exports;
    function foo2() {
        return null;
    }
    exports.foo2 = foo2;
});

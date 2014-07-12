//// [collisionExportsRequireAndClass.js]
define(["require", "exports"], function(require, exports) {
    var require = (function () {
        function require() {
        }
        return require;
    })();
    exports.require = require;
    var exports = (function () {
        function exports() {
        }
        return exports;
    })();
    exports.exports = exports;
});

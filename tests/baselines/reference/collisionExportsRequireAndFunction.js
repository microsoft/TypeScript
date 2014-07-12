//// [collisionExportsRequireAndFunction.js]
define(["require", "exports"], function(require, exports) {
    function exports() {
        return 1;
    }
    exports.exports = exports;
    function require() {
        return "require";
    }
    exports.require = require;
});

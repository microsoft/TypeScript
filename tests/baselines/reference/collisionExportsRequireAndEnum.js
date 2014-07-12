//// [collisionExportsRequireAndEnum.js]
define(["require", "exports"], function(require, exports) {
    (function (require) {
        require[require["_thisVal1"] = 0] = "_thisVal1";
        require[require["_thisVal2"] = 1] = "_thisVal2";
    })(exports.require || (exports.require = {}));
    var require = exports.require;
    (function (exports) {
        exports[exports["_thisVal1"] = 0] = "_thisVal1";
        exports[exports["_thisVal2"] = 1] = "_thisVal2";
    })(exports.exports || (exports.exports = {}));
    var exports = exports.exports;
});

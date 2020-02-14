define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var outer;
    exports.outer = undefined;
    (function (outer) {
        var inner;
        (function (inner) {
            var local = 1;
            inner.a = local;
        })(inner = outer.inner || (outer.inner = {}));
    })(outer = exports.outer || (exports.outer = {}));
});

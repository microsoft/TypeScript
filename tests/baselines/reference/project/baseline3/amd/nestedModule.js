define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.outer = void 0;
    var outer;
    (function (outer) {
        var inner;
        (function (inner) {
            var local = 1;
            inner.a = local;
        })(inner = outer.inner || (outer.inner = {}));
    })(outer = exports.outer || (exports.outer = {}));
});

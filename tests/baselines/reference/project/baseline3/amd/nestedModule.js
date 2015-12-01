define(["require", "exports"], function (require, exports) {
    "use strict";
    var outer;
    (function (outer) {
        var inner;
        (function (inner) {
            var local = 1;
            inner.a = local;
        })(inner = outer.inner || (outer.inner = {}));
    })(outer = exports.outer || (exports.outer = {}));
});

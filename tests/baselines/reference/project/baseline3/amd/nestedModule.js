define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (outer) {
        var inner;
        (function (inner) {
            var local = 1;
            inner.a = local;
        })(inner = outer.inner || (outer.inner = {}));
    })(exports.outer || (exports.outer = {}));
    var outer = exports.outer;
});

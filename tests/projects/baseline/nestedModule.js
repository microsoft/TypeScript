define(["require", "exports"], function(require, exports) {
    (function (outer) {
        (function (inner) {
            var local = 1;
            inner.a = local;
        })(outer.inner || (outer.inner = {}));
        var inner = outer.inner;
    })(exports.outer || (exports.outer = {}));
    var outer = exports.outer;
})

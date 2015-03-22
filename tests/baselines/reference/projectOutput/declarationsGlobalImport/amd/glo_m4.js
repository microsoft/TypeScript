define(["require", "exports"], function (require, exports) {
    var d = (function () {
        function d() {
        }
        return d;
    })();
    exports.d = d;
    ;
    exports.x;
    function foo() {
        return new d();
    }
    exports.foo = foo;
});

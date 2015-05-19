define(["require", "exports"], function (require, exports) {
    var d = (function () {
        function d() {
        }
        return d;
    })();
    exports.d = d;
    ;
    function foo() {
        return new d();
    }
    exports.foo = foo;
});

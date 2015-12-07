define(["require", "exports"], function (require, exports) {
    "use strict";
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

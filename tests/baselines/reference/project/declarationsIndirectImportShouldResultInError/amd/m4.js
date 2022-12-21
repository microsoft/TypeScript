define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = exports.x = exports.d = void 0;
    var d = /** @class */ (function () {
        function d() {
        }
        return d;
    }());
    exports.d = d;
    ;
    function foo() {
        return new d();
    }
    exports.foo = foo;
});

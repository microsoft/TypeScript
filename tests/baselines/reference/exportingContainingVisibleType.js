//// [exportingContainingVisibleType.ts]
class Foo {
    public get foo() {
        var i: Foo;
        return i; // Should be fine (previous bug report visibility error).
 
    }
}
 
export var x = 5;


//// [exportingContainingVisibleType.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Foo = (function () {
        function Foo() {
        }
        var proto_1 = Foo.prototype;
        Object.defineProperty(proto_1, "foo", {
            get: function () {
                var i;
                return i; // Should be fine (previous bug report visibility error).
            },
            enumerable: true,
            configurable: true
        });
        return Foo;
    }());
    exports.x = 5;
});

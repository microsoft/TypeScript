//// [tests/cases/compiler/exportingContainingVisibleType.ts] ////

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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        Object.defineProperty(Foo.prototype, "foo", {
            get: function () {
                var i;
                return i; // Should be fine (previous bug report visibility error).
            },
            enumerable: false,
            configurable: true
        });
        return Foo;
    }());
    exports.x = 5;
});

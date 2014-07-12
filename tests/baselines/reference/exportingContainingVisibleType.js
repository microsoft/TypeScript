//// [exportingContainingVisibleType.ts]
class Foo {
    public get foo() {
        var i: Foo;
        return i; // Should be fine (previous bug report visibility error).
 
    }
}
 
export var x = 5;


//// [exportingContainingVisibleType.js]
define(["require", "exports"], function(require, exports) {
    var Foo = (function () {
        function Foo() {
        }
        Object.defineProperty(Foo.prototype, "foo", {
            get: function () {
                var i;
                return i;
            },
            enumerable: true,
            configurable: true
        });
        return Foo;
    })();

    exports.x = 5;
});

//// [returnValueInSetter.ts]
class f {
    set x(value) {
        return null; // Should be an error
    }
}



//// [returnValueInSetter.js]
var f = (function () {
    function f() {
    }
    Object.defineProperty(f.prototype, "x", {
        set: function (value) {
            return null; // Should be an error
        },
        enumerable: true,
        configurable: true
    });
    return f;
}());

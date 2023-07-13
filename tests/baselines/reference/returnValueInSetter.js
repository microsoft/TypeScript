//// [tests/cases/compiler/returnValueInSetter.ts] ////

//// [returnValueInSetter.ts]
class f {
    set x(value) {
        return null; // Should be an error
    }
}



//// [returnValueInSetter.js]
var f = /** @class */ (function () {
    function f() {
    }
    Object.defineProperty(f.prototype, "x", {
        set: function (value) {
            return null; // Should be an error
        },
        enumerable: false,
        configurable: true
    });
    return f;
}());

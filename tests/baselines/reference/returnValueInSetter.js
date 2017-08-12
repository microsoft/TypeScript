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
    var proto_1 = f.prototype;
    Object.defineProperty(proto_1, "x", {
        set: function (value) {
            return null; // Should be an error
        },
        enumerable: true,
        configurable: true
    });
    return f;
}());

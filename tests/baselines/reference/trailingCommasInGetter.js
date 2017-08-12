//// [trailingCommasInGetter.ts]
class X {
    get x(,) { return 0; }
}


//// [trailingCommasInGetter.js]
var X = (function () {
    function X() {
    }
    var proto_1 = X.prototype;
    Object.defineProperty(proto_1, "x", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    return X;
}());

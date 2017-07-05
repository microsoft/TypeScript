//// [trailingCommasInGetter.ts]
class X {
    get x(,) { return 0; }
}


//// [trailingCommasInGetter.js]
var X = (function () {
    function X() {
    }
    Object.defineProperty(X.prototype, "x", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    return X;
}());

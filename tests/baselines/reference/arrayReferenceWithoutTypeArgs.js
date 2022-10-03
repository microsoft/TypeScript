//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
var X = /** @class */ (function () {
    function X() {
    }
    X.prototype.f = function (a) { };
    return X;
}());

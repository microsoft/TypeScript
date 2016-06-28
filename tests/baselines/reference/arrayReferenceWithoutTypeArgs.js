//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
var X = (function () {
    function X() {
    }
    X.prototype.f = function (a) { };
    return X;
}());

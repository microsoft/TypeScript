//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
var X = (function () {
    function X() {
    }
    var proto_1 = X.prototype;
    proto_1.f = function (a) { };
    return X;
}());

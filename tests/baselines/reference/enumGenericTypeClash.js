//// [enumGenericTypeClash.ts]
class X<A,B,C> { }
enum X { MyVal }


//// [enumGenericTypeClash.js]
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
(function (X) {
    X[X["MyVal"] = 0] = "MyVal";
})(X || (X = {}));

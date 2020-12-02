//// [readonlyInNonPropertyParameters.ts]
// `readonly` won't work outside of property parameters
class X {
	method(readonly x: number) {}
	set x(readonly value: number) {}
}
(readonly x) => 0;
// OK to use `readonly` as a name
(readonly) => 0;

//// [readonlyInNonPropertyParameters.js]
// `readonly` won't work outside of property parameters
var X = /** @class */ (function () {
    function X() {
    }
    var X_prototype = X.prototype;
    X_prototype.method = function (x) { };
    Object.defineProperty(X_prototype, "x", {
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return X;
}());
(function (x) { return 0; });
// OK to use `readonly` as a name
(function (readonly) { return 0; });

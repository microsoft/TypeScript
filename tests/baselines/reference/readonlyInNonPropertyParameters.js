//// [readonlyInNonPropertyParameters.ts]

// `readonly` won't work outside of property parameters
class X {
	method(readonly x: number) {}
	set x(readonly value: number) {}
}
(readonly x) => 0;

//// [readonlyInNonPropertyParameters.js]
// `readonly` won't work outside of property parameters
var X = (function () {
    function X() {
    }
    X.prototype.method = function (x) { };
    Object.defineProperty(X.prototype, "x", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    return X;
}());
(function (x) { return 0; });

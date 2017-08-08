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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(X.prototype, ["method"]);
    return X;
}());
(function (x) { return 0; });
// OK to use `readonly` as a name
(function (readonly) { return 0; });

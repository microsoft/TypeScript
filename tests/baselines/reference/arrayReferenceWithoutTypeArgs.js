//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var X = (function () {
    function X() {
    }
    X.prototype.f = function (a) { };
    __names(X.prototype, ["f"]);
    return X;
}());

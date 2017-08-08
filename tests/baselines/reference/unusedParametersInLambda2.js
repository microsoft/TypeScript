//// [unusedParametersInLambda2.ts]
class A {
    public f1() {
        return (X, Y) => {
            Y;
        }
    }
}

//// [unusedParametersInLambda2.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        return function (X, Y) {
            Y;
        };
    };
    __names(A.prototype, ["f1"]);
    return A;
}());

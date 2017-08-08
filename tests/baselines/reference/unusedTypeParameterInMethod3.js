//// [unusedTypeParameterInMethod3.ts]
class A {
    public f1<X, Y, Z>() {
        var a: X;
        var b: Y;
        a;
        b;
    }
}

//// [unusedTypeParameterInMethod3.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.f1 = function () {
        var a;
        var b;
        a;
        b;
    };
    __names(A.prototype, ["f1"]);
    return A;
}());

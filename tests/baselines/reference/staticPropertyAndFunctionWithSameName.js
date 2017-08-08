//// [staticPropertyAndFunctionWithSameName.ts]
class C {
    static f: number;
    f: number;
}

class D {
    static f: number;
    f() { }
}

//// [staticPropertyAndFunctionWithSameName.js]
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
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.f = function () { };
    __names(D.prototype, ["f"]);
    return D;
}());

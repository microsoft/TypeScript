//// [propertyAndFunctionWithSameName.ts]
class C {
    x: number;
    x() { // error
        return 1;
    }
}

class D {
    x: number;
    x(v) { } // error
}

//// [propertyAndFunctionWithSameName.js]
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
    C.prototype.x = function () {
        return 1;
    };
    __names(C.prototype, ["x"]);
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.x = function (v) { }; // error
    __names(D.prototype, ["x"]);
    return D;
}());

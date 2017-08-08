//// [classWithOptionalParameter.ts]
// classes do not permit optional parameters, these are errors

class C {
    x?: string;
    f?() {}
}

class C2<T> {
    x?: T;
    f?(x: T) {}
}

//// [classWithOptionalParameter.js]
// classes do not permit optional parameters, these are errors
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
var C = (function () {
    function C() {
    }
    C.prototype.f = function () { };
    __names(C.prototype, ["f"]);
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.f = function (x) { };
    __names(C2.prototype, ["f"]);
    return C2;
}());

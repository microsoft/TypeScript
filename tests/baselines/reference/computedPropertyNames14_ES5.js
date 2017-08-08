//// [computedPropertyNames14_ES5.ts]
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}

//// [computedPropertyNames14_ES5.js]
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
var b;
var C = (function () {
    function C() {
    }
    C.prototype[_a = b] = function () { };
    C[true] = function () { };
    C.prototype[_b = []] = function () { };
    C[{}] = function () { };
    C.prototype[_c = undefined] = function () { };
    C[null] = function () { };
    __names(C.prototype, [_a, _b, _c]);
    return C;
    var _a, _b, _c;
}());

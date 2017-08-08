//// [computedPropertyNames15_ES5.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
class C {
    [p1]() { }
    [p2]() { }
    [p3]() { }
}

//// [computedPropertyNames15_ES5.js]
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
var p1;
var p2;
var p3;
var C = (function () {
    function C() {
    }
    C.prototype[_a = p1] = function () { };
    C.prototype[_b = p2] = function () { };
    C.prototype[_c = p3] = function () { };
    __names(C.prototype, [_a, _b, _c]);
    return C;
    var _a, _b, _c;
}());

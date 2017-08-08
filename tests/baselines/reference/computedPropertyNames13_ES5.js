//// [computedPropertyNames13_ES5.ts]
var s: string;
var n: number;
var a: any;
class C {
    [s]() {}
    [n]() { }
    static [s + s]() { }
    [s + n]() { }
    [+s]() { }
    static [""]() { }
    [0]() { }
    [a]() { }
    static [<any>true]() { }
    [`hello bye`]() { }
    static [`hello ${a} bye`]() { }
}

//// [computedPropertyNames13_ES5.js]
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
var s;
var n;
var a;
var C = (function () {
    function C() {
    }
    C.prototype[_a = s] = function () { };
    C.prototype[_b = n] = function () { };
    C[s + s] = function () { };
    C.prototype[_c = s + n] = function () { };
    C.prototype[_d = +s] = function () { };
    C[""] = function () { };
    C.prototype[_e = 0] = function () { };
    C.prototype[_f = a] = function () { };
    C[true] = function () { };
    C.prototype[_g = "hello bye"] = function () { };
    C["hello " + a + " bye"] = function () { };
    __names(C.prototype, [_a, _b, _c, _d, _e, _f, _g]);
    return C;
    var _a, _b, _c, _d, _e, _f, _g;
}());

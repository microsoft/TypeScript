//// [computedPropertyNames10_ES5.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]() { },
    [n]() { },
    [s + s]() { },
    [s + n]() { },
    [+s]() { },
    [""]() { },
    [0]() { },
    [a]() { },
    [<any>true]() { },
    [`hello bye`]() { },
    [`hello ${a} bye`]() { }
}

//// [computedPropertyNames10_ES5.js]
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
var s;
var n;
var a;
var v = (_a = {},
    _a[_b = s] = function () { },
    _a[_c = n] = function () { },
    _a[_d = s + s] = function () { },
    _a[_e = s + n] = function () { },
    _a[_f = +s] = function () { },
    _a[_g = ""] = function () { },
    _a[_h = 0] = function () { },
    _a[_j = a] = function () { },
    _a[_k = true] = function () { },
    _a[_l = "hello bye"] = function () { },
    _a[_m = "hello " + a + " bye"] = function () { }, __names(_a, [_b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m]),
    _a);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

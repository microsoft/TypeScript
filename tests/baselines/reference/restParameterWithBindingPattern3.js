//// [restParameterWithBindingPattern3.ts]
function a(...[a = 1, b = true]: string[]) { }

function b(...[...foo = []]: string[]) { }

function c(...{0: a, length, 3: d}: [boolean, string, number]) { }

function d(...[a, , , d]: [boolean, string, number]) { }

function e(...{0: a = 1, 1: b = true, ...rest: rest}: [boolean, string, number]) { }

//// [restParameterWithBindingPattern3.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], b = _c === void 0 ? true : _c;
}
function b() {
    var _d = [];
    for (var _e = 0; _e < arguments.length; _e++) {
        _d[_e] = arguments[_e];
    }
    var _f = _d.slice(0), foo = _f === void 0 ? [] : _f;
}
function c() {
    var _g = [];
    for (var _h = 0; _h < arguments.length; _h++) {
        _g[_h] = arguments[_h];
    }
    var a = _g[0], length = _g.length, d = _g[3];
}
function d() {
    var _j = [];
    for (var _k = 0; _k < arguments.length; _k++) {
        _j[_k] = arguments[_k];
    }
    var a = _j[0], d = _j[3];
}
function e() {
    var _l = [];
    for (var _m = 0; _m < arguments.length; _m++) {
        _l[_m] = arguments[_m];
    }
    var _o = _l[0], a = _o === void 0 ? 1 : _o, _p = _l[1], b = _p === void 0 ? true : _p, rest = __rest(_l, [0, 1]);
}

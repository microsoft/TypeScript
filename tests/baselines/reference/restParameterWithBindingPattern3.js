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
    for (var _i = 0; _i < arguments.length; _i++) {
        _d[_i] = arguments[_i];
    }
    var _e = _d.slice(0), foo = _e === void 0 ? [] : _e;
}
function c() {
    var _f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _f[_i] = arguments[_i];
    }
    var a = _f[0], length = _f.length, d = _f[3];
}
function d() {
    var _g = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _g[_i] = arguments[_i];
    }
    var a = _g[0], d = _g[3];
}
function e() {
    var _h = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _h[_i] = arguments[_i];
    }
    var _j = _h[0], a = _j === void 0 ? 1 : _j, _k = _h[1], b = _k === void 0 ? true : _k, rest = __rest(_h, [0, 1]);
}

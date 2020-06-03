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
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var _b = _a.slice(0), foo = _b === void 0 ? [] : _b;
}
function c() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a[0], length = _a.length, d = _a[3];
}
function d() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a[0], d = _a[3];
}
function e() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], b = _c === void 0 ? true : _c, rest = __rest(_a, ["0", "1"]);
}

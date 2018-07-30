//// [restParameterWithBindingPattern3.ts]
function a(...[a = 1, b = true]: string[]) { }

function b(...[...foo = []]: string[]) { }

function c(...{0: a, length, 3: d}: [boolean, string, number]) { }

function d(...[a, , , d]: [boolean, string, number]) { }

//// [restParameterWithBindingPattern3.js]
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

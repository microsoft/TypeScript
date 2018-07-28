//// [restParameterWithBindingPattern3.ts]
function a(...[a = 1, b = true]: string[]) { }

//// [restParameterWithBindingPattern3.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var _b = _a[0], a = _b === void 0 ? 1 : _b, _c = _a[1], b = _c === void 0 ? true : _c;
}

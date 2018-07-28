//// [restParameterWithBindingPattern4.ts]
function a(...[...foo = []]: string[]) { }

//// [restParameterWithBindingPattern4.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var _b = _a.slice(0), foo = _b === void 0 ? [] : _b;
}

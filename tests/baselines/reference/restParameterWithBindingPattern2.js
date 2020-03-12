//// [restParameterWithBindingPattern2.ts]
function a(...[a, b]) { }

//// [restParameterWithBindingPattern2.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a[0], b = _a[1];
}
//# sourceMappingURL=restParameterWithBindingPattern2.js.map
//// [restParameterWithBindingPattern1.ts]
function a(...{a, b}) { }

//// [restParameterWithBindingPattern1.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a.a, b = _a.b;
}
//# sourceMappingURL=restParameterWithBindingPattern1.js.map
//// [restParameterWithBindingPattern5.ts]
function a(...{0: a, length, 3: d}: [boolean, string, number]) { }

//// [restParameterWithBindingPattern5.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a[0], length = _a.length, d = _a[3];
}

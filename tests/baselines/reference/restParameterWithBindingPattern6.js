//// [restParameterWithBindingPattern6.ts]
function a(...[a, , , d]: [boolean, string, number]) { }

//// [restParameterWithBindingPattern6.js]
function a() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a[_i] = arguments[_i];
    }
    var a = _a[0], d = _a[3];
}

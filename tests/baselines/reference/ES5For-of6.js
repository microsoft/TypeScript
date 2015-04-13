//// [ES5For-of6.ts]
for (var w of []) {
    for (var v of []) {
        var x = [w, v];
    }
}

//// [ES5For-of6.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var w = _a[_i];
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        var v = _c[_b];
        var x = [w, v];
    }
}

//// [ES5For-of16.ts]
for (let v of []) {
    v;
    for (let v of []) {
        var x = v;
        v++;
    }
}

//// [ES5For-of16.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    v;
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        var _v = _c[_b];
        var x = _v;
        _v++;
    }
}

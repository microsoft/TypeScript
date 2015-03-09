//// [ES5For-of17.ts]
for (let v of []) {
    v;
    for (let v of [v]) {
        var x = v;
        v++;
    }
}

//// [ES5For-of17.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    v;
    for (var _b = 0, _c = [
        v
    ]; _b < _c.length; _b++) {
        var _v = _c[_b];
        var x = _v;
        _v++;
    }
}

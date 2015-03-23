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
    var _v = _a[_i];
    _v;
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        var _v_1 = _c[_b];
        var x = _v_1;
        _v_1++;
    }
}

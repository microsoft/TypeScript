//// [ES5For-of15.ts]
for (let v of []) {
    v;
    for (const v of []) {
        var x = v;
    }
}

//// [ES5For-of15.js]
for (var v, _i = 0, _a = []; _i < _a.length; _i++) {
    v = _a[_i];
    v;
    for (var _v, _i_1 = 0, _a_1 = []; _i_1 < _a_1.length; _i_1++) {
        _v = _a_1[_i_1];
        var x = _v;
    }
}

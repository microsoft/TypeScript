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
    for (var _i_1 = 0, _a_1 = [v]; _i_1 < _a_1.length; _i_1++) {
        var _v = _a_1[_i_1];
        var x = _v;
        _v++;
    }
}

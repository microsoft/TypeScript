//// [ES5For-of21.ts]
for (let v of []) {
    for (let _i of []) { }
}

//// [ES5For-of21.js]
for (var v, _i = 0, _a = []; _i < _a.length; _i++) {
    v = _a[_i];
    for (var _i_1, _i_2 = 0, _a_1 = []; _i_2 < _a_1.length; _i_2++) {
        _i_1 = _a_1[_i_2];
    }
}

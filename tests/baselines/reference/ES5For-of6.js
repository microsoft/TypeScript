//// [ES5For-of6.ts]
for (var w of []) {
    for (var v of []) {
        var x = [w, v];
    }
}

//// [ES5For-of6.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var w = _a[_i];
    for (var _i_1 = 0, _a_1 = []; _i_1 < _a_1.length; _i_1++) {
        var v = _a_1[_i_1];
        var x = [w, v];
    }
}

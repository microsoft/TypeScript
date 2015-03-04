//// [ES5For-of21.ts]
for (let v of []) {
    for (let _i of []) { }
}

//// [ES5For-of21.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        var _i_1 = _c[_b];
    }
}

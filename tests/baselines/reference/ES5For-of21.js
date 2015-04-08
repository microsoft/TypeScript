//// [ES5For-of21.ts]
for (let v of []) {
    for (let _i of []) { }
}

//// [ES5For-of21.js]
for (var _a = 0, _b = []; _a < _b.length; _a++) {
    var v = _b[_a];
    for (var _c = 0, _d = []; _c < _d.length; _c++) {
        var _i = _d[_c];
    }
}

//// [ES5For-of20.ts]
for (let v of []) {
    let v;
    for (let v of [v]) {
        const v;
    }
}

//// [ES5For-of20.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    var _v;
    for (var _b = 0, _c = [
        v
    ]; _b < _c.length; _b++) {
        var _v_1 = _c[_b];
        var _v_2;
    }
}

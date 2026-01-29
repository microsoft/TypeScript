//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of15.ts] ////

//// [ES5For-of15.ts]
for (let v of []) {
    v;
    for (const v of []) {
        var x = v;
    }
}

//// [ES5For-of15.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    v;
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        var v_1 = _c[_b];
        var x = v_1;
    }
}

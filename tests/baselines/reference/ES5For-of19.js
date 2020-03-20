//// [ES5For-of19.ts]
for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}


//// [ES5For-of19.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var v = _a[_i];
    v;
    function foo() {
        for (var _b = 0, _c = []; _b < _c.length; _b++) {
            var v_1 = _c[_b];
            v_1;
        }
    }
}

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
for (var v, _i = 0, _a = []; _i < _a.length; _i++) {
    v = _a[_i];
    v;
    function foo() {
        for (var _v, _i = 0, _a = []; _i < _a.length; _i++) {
            _v = _a[_i];
            _v;
        }
    }
}

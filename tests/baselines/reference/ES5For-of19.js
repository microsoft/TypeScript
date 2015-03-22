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
    var _v = _a[_i];
    _v;
    function foo() {
        for (var _i = 0, _a = []; _i < _a.length; _i++) {
            var _v_1 = _a[_i];
            _v_1;
        }
    }
}

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
        for (var _i_1 = 0, _a_1 = []; _i_1 < _a_1.length; _i_1++) {
            var _v = _a_1[_i_1];
            _v;
        }
    }
}

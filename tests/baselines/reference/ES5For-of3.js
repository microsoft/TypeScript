//// [ES5For-of3.ts]
for (var v of [])
    var x = v;

//// [ES5For-of3.js]
for (var v, _i = 0, _a = []; _i < _a.length; _i++) {
    v = _a[_i];
    var x = v;
}

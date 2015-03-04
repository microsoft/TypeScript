//// [ES5For-of7.ts]
for (var w of []) {
    var x = w;
}

for (var v of []) {
    var x = [w, v];
}

//// [ES5For-of7.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var w = _a[_i];
    var x = w;
}
for (var _i = 0, _b = []; _i < _b.length; _i++) {
    var v = _b[_i];
    var x = [w, v];
}

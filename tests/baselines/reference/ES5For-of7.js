//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of7.ts] ////

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
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var v = _c[_b];
    var x = [w, v];
}

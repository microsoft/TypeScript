//// [omittedExpressionForOfLoop.ts]
for (const [,] of doesNotExist) {
}

for (const [,] of undefined) {
}

for (const [,] of []) {
}

for (const [] of []) {
}

//// [omittedExpressionForOfLoop.js]
for (var _i = 0, doesNotExist_1 = doesNotExist; _i < doesNotExist_1.length; _i++) {
    var _a = doesNotExist_1[_i];
}
for (var _b = 0, undefined_1 = undefined; _b < undefined_1.length; _b++) {
    var _c = undefined_1[_b];
}
for (var _d = 0, _e = []; _d < _e.length; _d++) {
    var _f = _e[_d];
}
for (var _g = 0, _h = []; _g < _h.length; _g++) {
    var _j = _h[_g];
}

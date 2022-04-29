//// [ES5For-of27.ts]
for (var {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of27.js]
for (var _i = 0, _a = [2, 3]; _i < _a.length; _i++) {
    var _b = _a[_i], _c = _b.x, a = _c === void 0 ? 0 : _c, _d = _b.y, b = _d === void 0 ? 1 : _d;
    a;
    b;
}

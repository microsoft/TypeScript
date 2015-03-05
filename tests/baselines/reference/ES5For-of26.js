//// [ES5For-of26.ts]
for (var [a = 0, b = 1] of [2, 3]) {
    a;
    b;
}

//// [ES5For-of26.js]
for (var _i = 0, _a = [2, 3]; _i < _a.length; _i++) {
    var _b = _a[_i], _c = _b[0], a = _c === void 0 ? 0 : _c, _d = _b[1], b = _d === void 0 ? 1 : _d;
    a;
    b;
}
//# sourceMappingURL=ES5For-of26.js.map
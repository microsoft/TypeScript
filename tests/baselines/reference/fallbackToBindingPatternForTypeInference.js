//// [fallbackToBindingPatternForTypeInference.ts]
declare function trans<T>(f: (x: T) => string): number;
trans(({a}) => a);
trans(([b,c]) => 'foo');
trans(({d: [e,f]}) => 'foo');
trans(([{g},{h}]) => 'foo');
trans(({a, b = 10}) => a);


//// [fallbackToBindingPatternForTypeInference.js]
trans(function (_a) {
    var a = _a.a;
    return a;
});
trans(function (_b) {
    var b = _b[0], c = _b[1];
    return 'foo';
});
trans(function (_c) {
    var _d = _c.d, e = _d[0], f = _d[1];
    return 'foo';
});
trans(function (_e) {
    var g = _e[0].g, h = _e[1].h;
    return 'foo';
});
trans(function (_f) {
    var a = _f.a, _g = _f.b, b = _g === void 0 ? 10 : _g;
    return a;
});

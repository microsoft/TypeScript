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
trans(function (_a) {
    var b = _a[0], c = _a[1];
    return 'foo';
});
trans(function (_a) {
    var _b = _a.d, e = _b[0], f = _b[1];
    return 'foo';
});
trans(function (_a) {
    var g = _a[0].g, h = _a[1].h;
    return 'foo';
});
trans(function (_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 10 : _b;
    return a;
});

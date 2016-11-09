//// [fallbackToBindingPatternForTypeInference.ts]
declare function trans<T>(f: (x: T) => string): number;
trans(({a}) => a);
trans(([b,c]) => 'foo');
trans(({d: [e,f]}) => 'foo');
trans(([{g},{h}]) => 'foo');
trans(({a, b = 10}) => a);


//// [fallbackToBindingPatternForTypeInference.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
trans(function (_a) {
    var a = _a.a;
    return a;
});
trans(function (_a) {
    var _b = __read(_a, 2), b = _b[0], c = _b[1];
    return 'foo';
});
trans(function (_a) {
    var _b = __read(_a.d, 2), e = _b[0], f = _b[1];
    return 'foo';
});
trans(function (_a) {
    var _b = __read(_a, 2), g = _b[0].g, h = _b[1].h;
    return 'foo';
});
trans(function (_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 10 : _b;
    return a;
});

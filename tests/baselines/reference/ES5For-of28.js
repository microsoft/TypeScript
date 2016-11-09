//// [ES5For-of28.ts]
for (let [a = 0, b = 1] of [2, 3]) {
    a;
    b;
}

//// [ES5For-of28.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
for (var _i = 0, _a = [2, 3]; _i < _a.length; _i++) {
    var _b = __read(_a[_i], 2), _c = _b[0], a = _c === void 0 ? 0 : _c, _d = _b[1], b = _d === void 0 ? 1 : _d;
    a;
    b;
}

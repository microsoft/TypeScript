//// [ES5For-of12.ts]
for ([""] of [[""]]) { }

//// [ES5For-of12.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
for (var _i = 0, _a = [[""]]; _i < _a.length; _i++) {
    _b = __read(_a[_i], 1), "" = _b[0];
}
var _b;

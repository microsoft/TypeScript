//// [tupleElementTypes2.ts]
function f([a, b]: [number, any]) { }

//// [tupleElementTypes2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f(_a) {
    var _b = __read(_a, 2), a = _b[0], b = _b[1];
}

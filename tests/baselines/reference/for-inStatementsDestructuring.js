//// [for-inStatementsDestructuring.ts]
for (var [a, b] in []) {}

//// [for-inStatementsDestructuring.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
for (var _a = __read(void 0, 2), a = _a[0], b = _a[1] in []) { }

//// [declarationWithNoInitializer.ts]
var [a, b];          // Error, no initializer
var {c, d};          // Error, no initializer


//// [declarationWithNoInitializer.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _a = __read(void 0, 2), a = _a[0], b = _a[1]; // Error, no initializer
var _b = void 0, c = _b.c, d = _b.d; // Error, no initializer

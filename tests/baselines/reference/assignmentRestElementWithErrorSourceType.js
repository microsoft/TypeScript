//// [assignmentRestElementWithErrorSourceType.ts]
var tuple: [string, number];
[...c] = tupel; // intentionally misspelled

//// [assignmentRestElementWithErrorSourceType.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var tuple;
_a = __read(tupel), c = _a.slice(0); // intentionally misspelled
var _a;

//// [restElementWithAssignmentPattern3.ts]
var a: string, b: number;
var tuple: [string, number] = ["", 1];
[...[a, b = 0]] = tuple;

//// [restElementWithAssignmentPattern3.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var a, b;
var tuple = ["", 1];
_a = __read(tuple), _b = __read(_a.slice(0), 2), a = _b[0], _c = _b[1], b = _c === void 0 ? 0 : _c;
var _a, _b, _c;

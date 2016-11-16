//// [restElementWithAssignmentPattern4.ts]
var a: string, b: number;
var tuple: [string, number] = ["", 1];
[...{ 0: a = "", b }] = tuple;

//// [restElementWithAssignmentPattern4.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var a, b;
var tuple = ["", 1];
_a = __read(tuple), _b = _a.slice(0), _c = _b[0], a = _c === void 0 ? "" : _c, b = _b.b;
var _a, _b, _c;

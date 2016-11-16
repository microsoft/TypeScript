//// [restElementWithAssignmentPattern5.ts]
var s: string, s2: string;
[...[s, s2]] = ["", ""];

//// [restElementWithAssignmentPattern5.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var s, s2;
_a = __read(["", ""].slice(0), 2), s = _a[0], s2 = _a[1];
var _a;

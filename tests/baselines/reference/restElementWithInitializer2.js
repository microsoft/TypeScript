//// [restElementWithInitializer2.ts]
var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var a;
var x;
_a = __read(a), _b = _a.slice(0), x = _b === void 0 ? a : _b; // Error, rest element cannot have initializer
var _a, _b;

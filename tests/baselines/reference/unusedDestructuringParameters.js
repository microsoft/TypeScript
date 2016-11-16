//// [unusedDestructuringParameters.ts]
const f = ([a]) => { };
f([1]);
const f2 = ({a}) => { };
f2({ a: 10 });
const f3 = ([_]) => { };
f3([10]);

//// [unusedDestructuringParameters.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var f = function (_a) {
    var _b = __read(_a, 1), a = _b[0];
};
f([1]);
var f2 = function (_a) {
    var a = _a.a;
};
f2({ a: 10 });
var f3 = function (_a) {
    var _b = __read(_a, 1), _ = _b[0];
};
f3([10]);

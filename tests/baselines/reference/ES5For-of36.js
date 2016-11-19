//// [ES5For-of36.ts]
for (let [a = 0, b = 1] of [2, 3]) {
    a;
    b;
}

//// [ES5For-of36.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
try {
    for (var iterator_1 = { iterator: __values([2, 3]) }; __step(iterator_1);) {
        var _a = __read(iterator_1.result.value, 2), _b = _a[0], a = _b === void 0 ? 0 : _b, _c = _a[1], b = _c === void 0 ? 1 : _c;
        a;
        b;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;
//# sourceMappingURL=ES5For-of36.js.map
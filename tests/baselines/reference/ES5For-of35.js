//// [ES5For-of35.ts]
for (const {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of35.js]
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
try {
    for (var iterator_1 = { iterator: __values([2, 3]) }; __step(iterator_1);) {
        var _a = iterator_1.result.value, _b = _a.x, a = _b === void 0 ? 0 : _b, _c = _a.y, b = _c === void 0 ? 1 : _c;
        a;
        b;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;
//# sourceMappingURL=ES5For-of35.js.map
//// [parserES5ForOfStatement16.ts]
for (var {a, b} of X) {
}

//// [parserES5ForOfStatement16.js]
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
try {
    for (var X_1 = { iterator: __values(X) }; __step(X_1);) {
        var _a = X_1.result.value, a = _a.a, b = _a.b;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(X_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;

//// [ES5For-of24.ts]
var a = [1, 2, 3];
for (var v of a) {
    let a = 0;
}

//// [ES5For-of24.js]
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
var a = [1, 2, 3];
try {
    for (var a_1 = { iterator: __values(a) }; __step(a_1);) {
        var v = a_1.result.value;
        var a_2 = 0;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(a_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;

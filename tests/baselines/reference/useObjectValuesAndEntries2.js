//// [useObjectValuesAndEntries2.ts]

var o = { a: 1, b: 2 };

for (var x of Object.values(o)) {
    let y = x;
}

var entries = Object.entries(o);

//// [useObjectValuesAndEntries2.js]
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
var o = { a: 1, b: 2 };
try {
    for (var iterator_1 = { iterator: __values(Object.values(o)) }; __step(iterator_1);) {
        var x = iterator_1.result.value;
        var y = x;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
}
var entries = Object.entries(o);
var e_1;

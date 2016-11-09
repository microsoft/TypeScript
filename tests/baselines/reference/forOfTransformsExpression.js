//// [forOfTransformsExpression.ts]
// https://github.com/Microsoft/TypeScript/issues/11024
let items = [{ name: "A" }, { name: "C" }, { name: "B" }];
for (var item of items.sort((a, b) => a.name.localeCompare(b.name))) {

}

//// [forOfTransformsExpression.js]
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
// https://github.com/Microsoft/TypeScript/issues/11024
var items = [{ name: "A" }, { name: "C" }, { name: "B" }];
try {
    for (var iterator_1 = { iterator: __values(items.sort(function (a, b) { return a.name.localeCompare(b.name); })) }; __step(iterator_1);) {
        var item = iterator_1.result.value;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;

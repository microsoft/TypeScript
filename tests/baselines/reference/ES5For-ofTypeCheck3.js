//// [ES5For-ofTypeCheck3.ts]
var tuple: [string, number] = ["", 0];
for (var v of tuple) { }

//// [ES5For-ofTypeCheck3.js]
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var tuple = ["", 0];
try {
    for (var tuple_1 = { iterator: __values(tuple) }; __step(tuple_1);) {
        var v = tuple_1.result.value;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(tuple_1); } finally { if (e_1) throw e_1.error; }
}
var e_1;

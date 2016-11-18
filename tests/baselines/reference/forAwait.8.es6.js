//// [forAwait.8.es6.ts]
declare const i: Iterable<number>;
function* f() {
    for await (const x of i) {
    }
}

//// [forAwait.8.es6.js]
var __asyncStep = (this && this.__asyncStep) || function (r) { return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); }); };
var __asyncValues = (this && this.__asyncIterator) || function (o) { return (m = o[Symbol.asyncIterator]) ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator](); var m; };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
function* f() {
    try {
        for (var i_1 = { iterator: __asyncValues(i) }; yield ["await", __asyncStep(i_1)];) {
            const x = i_1.result.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { yield ["await", __close(i_1)]; } finally { if (e_1) throw e_1.error; }
    }
    var e_1;
}

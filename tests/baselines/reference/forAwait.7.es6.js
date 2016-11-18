//// [forAwait.7.es6.ts]
declare const ai: AsyncIterable<number>;
function* f() {
    for await (const x of ai) {
    }
}

//// [forAwait.7.es6.js]
var __asyncStep = (this && this.__asyncStep) || function (r) { return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); }); };
var __asyncValues = (this && this.__asyncIterator) || function (o) { return (m = o[Symbol.asyncIterator]) ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator](); var m; };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
function* f() {
    try {
        for (var ai_1 = { iterator: __asyncValues(ai) }; yield ["await", __asyncStep(ai_1)];) {
            const x = ai_1.result.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { yield ["await", __close(ai_1)]; } finally { if (e_1) throw e_1.error; }
    }
    var e_1;
}

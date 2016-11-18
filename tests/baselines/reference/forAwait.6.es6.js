//// [forAwait.6.es6.ts]
declare const i: Iterable<number>;
async function* f() {
    for await (const x of i) {
    }
}

//// [forAwait.6.es6.js]
var __asyncStep = (this && this.__asyncStep) || function (r) { return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); }); };
var __asyncValues = (this && this.__asyncIterator) || function (o) { return (m = o[Symbol.asyncIterator]) ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator](); var m; };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    var g = generator.apply(thisArg, _arguments || []), q = [], c, i;
    return i = { next: verb("next"), "throw": verb("throw"), "return": verb("return") }, i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { return function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]), next(); }); }; }
    function next() { if (!c && q.length) resume((c = q.shift())[0], c[1]); }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(c[3], e); } }
    function step(r) { r.done ? settle(c[2], r) : r.value[0] === "yield" ? settle(c[2], { value: r.value[1], done: false }) : Promise.resolve(r.value[1]).then(r.value[0] === "delegate" ? delegate : fulfill, reject); }
    function delegate(r) { step(r.done ? r : { value: ["yield", r.value], done: false }); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { c = void 0, f(v), next(); }
};
function f() {
    return __asyncGenerator(this, arguments, function* f_1() {
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
    });
}

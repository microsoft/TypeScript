//// [forAwait.4.es6.ts]
declare const i: Iterable<number>;
async function f() {
    for await (const x of i) {
    }
}

//// [forAwait.4.es6.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __asyncStep = (this && this.__asyncStep) || function (r) { return !r.done && Promise.resolve(r.iterator.next()).then(function (_) { return !(r.done = (r.result = _).done); }); };
var __asyncValues = (this && this.__asyncIterator) || function (o) { return (m = o[Symbol.asyncIterator]) ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator](); var m; };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
function f() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var i_1 = { iterator: __asyncValues(i) }; yield __asyncStep(i_1);) {
                const x = i_1.result.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try { yield __close(i_1); } finally { if (e_1) throw e_1.error; }
        }
        var e_1;
    });
}

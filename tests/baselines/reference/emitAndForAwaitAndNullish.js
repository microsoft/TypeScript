//// [emitAndForAwaitAndNullish.ts]
async function* getIterator() {
    yield { member: 1 };
    yield { member: 2 };
    yield { member: 3 };
}
async function* outerIterator() {
    var _a, _b;
    for await (const row of getIterator()) {
        // This line causes a name collision with by setting a variable `_b`,
        // which is also used to hold the iterator above:
        if (((_a = row.member) !== null && _a !== void 0 ? _a : null) === ((_b = row.member) !== null && _b !== void 0 ? _b : null)) {
            yield row;
        }
    }
}
async function main() {
    for await (const row of outerIterator()) {

    }
}
main();


//// [emitAndForAwaitAndNullish.js]
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
function getIterator() {
    return __asyncGenerator(this, arguments, function* getIterator_1() {
        yield yield __await({ member: 1 });
        yield yield __await({ member: 2 });
        yield yield __await({ member: 3 });
    });
}
function outerIterator() {
    return __asyncGenerator(this, arguments, function* outerIterator_1() {
        var e_1, _c;
        var _a, _b;
        try {
            for (var _d = __asyncValues(getIterator()), _e; _e = yield __await(_d.next()), !_e.done;) {
                const row = _e.value;
                // This line causes a name collision with by setting a variable `_b`,
                // which is also used to hold the iterator above:
                if (((_a = row.member) !== null && _a !== void 0 ? _a : null) === ((_b = row.member) !== null && _b !== void 0 ? _b : null)) {
                    yield yield __await(row);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) yield __await(_c.call(_d));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
async function main() {
    var e_2, _f;
    try {
        for (var _g = __asyncValues(outerIterator()), _h; _h = await _g.next(), !_h.done;) {
            const row = _h.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_h && !_h.done && (_f = _g.return)) await _f.call(_g);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
main();

//// [iteratorAsyncIteratorOverlap.ts]
function typeAssert<T>(x: T) { void x; }

async function* f(obj: {
	[Symbol.iterator](): Generator<string, void, unknown>;
    [Symbol.asyncIterator](): AsyncGenerator<number>;
}) {
	for (const y of obj) {
		typeAssert<string>(y);
	}

	for await (const y of obj) {
		typeAssert<number>(y);
	}
}

async function* g<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>): AsyncGenerator<A, void, undefined> {
	const [c] = obj;
	void c;
	yield* obj;
}

async function* h<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>): AsyncGenerator<A, void, undefined> {
	yield* obj;
}

async function* j<A, B>(obj: AsyncIterableIterator<A> & IterableIterator<B>) {
	yield* obj;
}

async function* i<A, B>(obj: AsyncIterable<A> & Iterable<B>): AsyncGenerator<A, void, undefined>{
	const [c] = obj;
	void c;
	yield* obj;
}


//// [iteratorAsyncIteratorOverlap.js]
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
function typeAssert(x) { void x; }
function f(obj) {
    return __asyncGenerator(this, arguments, function* f_1() {
        var e_1, _a;
        for (const y of obj) {
            typeAssert(y);
        }
        try {
            for (var obj_1 = __asyncValues(obj), obj_1_1; obj_1_1 = yield __await(obj_1.next()), !obj_1_1.done;) {
                const y = obj_1_1.value;
                typeAssert(y);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj_1_1 && !obj_1_1.done && (_a = obj_1.return)) yield __await(_a.call(obj_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function g(obj) {
    return __asyncGenerator(this, arguments, function* g_1() {
        const [c] = obj;
        void c;
        yield __await(yield* __asyncDelegator(__asyncValues(obj)));
    });
}
function h(obj) {
    return __asyncGenerator(this, arguments, function* h_1() {
        yield __await(yield* __asyncDelegator(__asyncValues(obj)));
    });
}
function j(obj) {
    return __asyncGenerator(this, arguments, function* j_1() {
        yield __await(yield* __asyncDelegator(__asyncValues(obj)));
    });
}
function i(obj) {
    return __asyncGenerator(this, arguments, function* i_1() {
        const [c] = obj;
        void c;
        yield __await(yield* __asyncDelegator(__asyncValues(obj)));
    });
}

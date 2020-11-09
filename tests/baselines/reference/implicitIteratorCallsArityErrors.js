//// [implicitIteratorCallsArityErrors.ts]
const obj = {
	a: 1,
	b: 2,

	*[Symbol.iterator]<T>(this: T, x: string) {
		for (const k in this) yield k;
	},
};

for (const i of obj) {

}

const [j] = obj;
const arr = [...obj];

async function* f() {
	for await (const x of obj) {

	}

	for await (const x of {
		async *[Symbol.asyncIterator](arr: string[]) {
			yield* arr;
		}
	}) {

	}

	yield* obj;

	yield* {
		async *[Symbol.asyncIterator](arr: string[]) {
			yield* arr;
		}
	};
}


async function* g<A, B>(x: {
	[Symbol.iterator](x: number): Generator<A>
}) {
	for (const y of x) {}
}


async function* h(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
} | {
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2;
	return u;
}

async function* foo(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
} & {
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2; // this is fine, just making sure caching works :)
	return u;
}

async function* bar(obj2: {
	a: number;
	b: number;
	[Symbol.iterator](): Generator<number, void, unknown>;
    [Symbol.asyncIterator]<T>(this: T, x: string): Generator<Extract<keyof T, string>, void, unknown>;
}) {
	yield* obj2;

	for await (const x of obj2) {

	}

	const [u] = obj2;
	return u;
}


//// [implicitIteratorCallsArityErrors.js]
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
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
const obj = {
    a: 1,
    b: 2,
    *[Symbol.iterator](x) {
        for (const k in this)
            yield k;
    },
};
for (const i of obj) {
}
const [j] = obj;
const arr = [...obj];
function f() {
    return __asyncGenerator(this, arguments, function* f_1() {
        var e_1, _a, e_2, _b;
        try {
            for (var obj_1 = __asyncValues(obj), obj_1_1; obj_1_1 = yield __await(obj_1.next()), !obj_1_1.done;) {
                const x = obj_1_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj_1_1 && !obj_1_1.done && (_a = obj_1.return)) yield __await(_a.call(obj_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _c = __asyncValues({
                [Symbol.asyncIterator](arr) {
                    return __asyncGenerator(this, arguments, function* _a() {
                        yield __await(yield* __asyncDelegator(__asyncValues(arr)));
                    });
                }
            }), _d; _d = yield __await(_c.next()), !_d.done;) {
                const x = _d.value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) yield __await(_b.call(_c));
            }
            finally { if (e_2) throw e_2.error; }
        }
        yield __await(yield* __asyncDelegator(__asyncValues(obj)));
        yield __await(yield* __asyncDelegator(__asyncValues({
            [Symbol.asyncIterator](arr) {
                return __asyncGenerator(this, arguments, function* _a() {
                    yield __await(yield* __asyncDelegator(__asyncValues(arr)));
                });
            }
        })));
    });
}
function g(x) {
    return __asyncGenerator(this, arguments, function* g_1() {
        for (const y of x) { }
    });
}
function h(obj2) {
    return __asyncGenerator(this, arguments, function* h_1() {
        var e_3, _a;
        yield __await(yield* __asyncDelegator(__asyncValues(obj2)));
        try {
            for (var obj2_1 = __asyncValues(obj2), obj2_1_1; obj2_1_1 = yield __await(obj2_1.next()), !obj2_1_1.done;) {
                const x = obj2_1_1.value;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (obj2_1_1 && !obj2_1_1.done && (_a = obj2_1.return)) yield __await(_a.call(obj2_1));
            }
            finally { if (e_3) throw e_3.error; }
        }
        const [u] = obj2;
        return yield __await(u);
    });
}
function foo(obj2) {
    return __asyncGenerator(this, arguments, function* foo_1() {
        var e_4, _a;
        yield __await(yield* __asyncDelegator(__asyncValues(obj2)));
        try {
            for (var obj2_2 = __asyncValues(obj2), obj2_2_1; obj2_2_1 = yield __await(obj2_2.next()), !obj2_2_1.done;) {
                const x = obj2_2_1.value;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (obj2_2_1 && !obj2_2_1.done && (_a = obj2_2.return)) yield __await(_a.call(obj2_2));
            }
            finally { if (e_4) throw e_4.error; }
        }
        const [u] = obj2; // this is fine, just making sure caching works :)
        return yield __await(u);
    });
}
function bar(obj2) {
    return __asyncGenerator(this, arguments, function* bar_1() {
        var e_5, _a;
        yield __await(yield* __asyncDelegator(__asyncValues(obj2)));
        try {
            for (var obj2_3 = __asyncValues(obj2), obj2_3_1; obj2_3_1 = yield __await(obj2_3.next()), !obj2_3_1.done;) {
                const x = obj2_3_1.value;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (obj2_3_1 && !obj2_3_1.done && (_a = obj2_3.return)) yield __await(_a.call(obj2_3));
            }
            finally { if (e_5) throw e_5.error; }
        }
        const [u] = obj2;
        return yield __await(u);
    });
}

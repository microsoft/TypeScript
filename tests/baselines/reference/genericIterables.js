//// [genericIterables.ts]
/**
 * Creates a new identity function with a type argument `T` that enforces that a given type `Q` is identical to `T`.
 */
export function constrainExact<T>() {
	return (x => x) as <Q extends T>(this: [T] extends [Q] ? void : never, arg: Q) => Q;
}

async function* f<A, B, C>(
    source0: AsyncIterableIterator<A> & { [Symbol.asyncIterator](): Generator<B> } & IterableIterator<C>,
    source1: AsyncIterableIterator<A> | { [Symbol.asyncIterator](): Generator<B> } | IterableIterator<C>,
    source2: (AsyncIterableIterator<A> | { [Symbol.asyncIterator](): Generator<B> }) & IterableIterator<C>,
	source3: AsyncIterableIterator<A> & AsyncGenerator<B>,
	source4: IterableIterator<C>,
	source5: AsyncIterableIterator<A> & Generator<B>,
	source6: {
		[Symbol.iterator](): Generator<B>;
		[Symbol.asyncIterator](): AsyncGenerator<A>;
	},
	source7: Iterable<A> | AsyncIterable<B>,
	source8: Iterable<A> & AsyncIterable<B>,
	source9: {
		a: 1,
		[Symbol.iterator]<T>(this: T): Generator<T[keyof T]>;
	} & {
		[Symbol.asyncIterator]<T>(this: T): AsyncGenerator<keyof T>;
	},
	source10: ({
		a: true,
		b: 2,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} | {
		a: false,
		c: 3,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	}) & { d: 4 },
	source11: ({
		a: true,
		b: 2,
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} & { e: 5 } | {
		a: false,
		c: 3,
		[Symbol.iterator]<T>(this: T): Generator<T[keyof T]>;
	}) & { d: 4 },
	source12: {
		[Symbol.iterator]<T>(this: T): Generator<keyof T>;
	} & ({ a: 1 } | { b: 2 }),
): AsyncGenerator<A & B, void, undefined> {
	const [c] = source0;
	void c;

	for await (const z of source0) constrainExact<A & B>()(z);
	for await (const z of source1) constrainExact<A | B | C>()(z);
	for await (const z of source2) constrainExact<A | B>()(z);

    yield* source0;

	for await (const z of source3) constrainExact<A & B>()(z);
	for await (const z of source4) constrainExact<C>()(z);
	for await (const z of source5) constrainExact<A>()(z);
	for await (const z of source6) constrainExact<A>()(z);
	for (const z of source6) constrainExact<B>()(z);
	for await (const z of source7) constrainExact<A | B>()(z);
	for await (const z of source8) constrainExact<B>()(z);
	for (const z of source8) constrainExact<A>()(z);
	for (const z of source9) constrainExact<1>()(z);
	for await (const z of source9) constrainExact<"a">()(z);

	// We do all these tests together because we need to make sure the cacheing logic didn't get screwed up

	if (source10.a) {
		for (const z of source10) constrainExact<"a" | "b" | "d">()(z);
		for (const z of source10[Symbol.iterator]()) constrainExact<"a" | "b" | "d">()(z);
	}
	for (const z of source10) constrainExact<"a" | "b" | "c" | "d">()(z);

	if (source11.a) {
		for (const z of source11) constrainExact<"a" | "b" | "d" | "e">()(z);
	}
	for (const z of source11) constrainExact<false | 4 | 3 | "a" | "b" | "e" | "d">()(z);
	const [h] = [...(source11.a ? [...source11] : source11.a === false && [...source11])];
	constrainExact<false | 4 | "a" | "b" | "e" | "d" | 3>()(h);
	for (const z of source12) constrainExact<"a" | "b">()(z);
}


//// [genericIterables.js]
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
/**
 * Creates a new identity function with a type argument `T` that enforces that a given type `Q` is identical to `T`.
 */
export function constrainExact() {
    return (x => x);
}
function f(source0, source1, source2, source3, source4, source5, source6, source7, source8, source9, source10, source11, source12) {
    return __asyncGenerator(this, arguments, function* f_1() {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, e_7, _g, e_8, _h, e_9, _j, e_10, _k;
        const [c] = source0;
        void c;
        try {
            for (var source0_1 = __asyncValues(source0), source0_1_1; source0_1_1 = yield __await(source0_1.next()), !source0_1_1.done;) {
                const z = source0_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source0_1_1 && !source0_1_1.done && (_a = source0_1.return)) yield __await(_a.call(source0_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var source1_1 = __asyncValues(source1), source1_1_1; source1_1_1 = yield __await(source1_1.next()), !source1_1_1.done;) {
                const z = source1_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (source1_1_1 && !source1_1_1.done && (_b = source1_1.return)) yield __await(_b.call(source1_1));
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var source2_1 = __asyncValues(source2), source2_1_1; source2_1_1 = yield __await(source2_1.next()), !source2_1_1.done;) {
                const z = source2_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (source2_1_1 && !source2_1_1.done && (_c = source2_1.return)) yield __await(_c.call(source2_1));
            }
            finally { if (e_3) throw e_3.error; }
        }
        yield __await(yield* __asyncDelegator(__asyncValues(source0)));
        try {
            for (var source3_1 = __asyncValues(source3), source3_1_1; source3_1_1 = yield __await(source3_1.next()), !source3_1_1.done;) {
                const z = source3_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (source3_1_1 && !source3_1_1.done && (_d = source3_1.return)) yield __await(_d.call(source3_1));
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var source4_1 = __asyncValues(source4), source4_1_1; source4_1_1 = yield __await(source4_1.next()), !source4_1_1.done;) {
                const z = source4_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (source4_1_1 && !source4_1_1.done && (_e = source4_1.return)) yield __await(_e.call(source4_1));
            }
            finally { if (e_5) throw e_5.error; }
        }
        try {
            for (var source5_1 = __asyncValues(source5), source5_1_1; source5_1_1 = yield __await(source5_1.next()), !source5_1_1.done;) {
                const z = source5_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (source5_1_1 && !source5_1_1.done && (_f = source5_1.return)) yield __await(_f.call(source5_1));
            }
            finally { if (e_6) throw e_6.error; }
        }
        try {
            for (var source6_1 = __asyncValues(source6), source6_1_1; source6_1_1 = yield __await(source6_1.next()), !source6_1_1.done;) {
                const z = source6_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (source6_1_1 && !source6_1_1.done && (_g = source6_1.return)) yield __await(_g.call(source6_1));
            }
            finally { if (e_7) throw e_7.error; }
        }
        for (const z of source6)
            constrainExact()(z);
        try {
            for (var source7_1 = __asyncValues(source7), source7_1_1; source7_1_1 = yield __await(source7_1.next()), !source7_1_1.done;) {
                const z = source7_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (source7_1_1 && !source7_1_1.done && (_h = source7_1.return)) yield __await(_h.call(source7_1));
            }
            finally { if (e_8) throw e_8.error; }
        }
        try {
            for (var source8_1 = __asyncValues(source8), source8_1_1; source8_1_1 = yield __await(source8_1.next()), !source8_1_1.done;) {
                const z = source8_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (source8_1_1 && !source8_1_1.done && (_j = source8_1.return)) yield __await(_j.call(source8_1));
            }
            finally { if (e_9) throw e_9.error; }
        }
        for (const z of source8)
            constrainExact()(z);
        for (const z of source9)
            constrainExact()(z);
        try {
            for (var source9_1 = __asyncValues(source9), source9_1_1; source9_1_1 = yield __await(source9_1.next()), !source9_1_1.done;) {
                const z = source9_1_1.value;
                constrainExact()(z);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (source9_1_1 && !source9_1_1.done && (_k = source9_1.return)) yield __await(_k.call(source9_1));
            }
            finally { if (e_10) throw e_10.error; }
        }
        // We do all these tests together because we need to make sure the cacheing logic didn't get screwed up
        if (source10.a) {
            for (const z of source10)
                constrainExact()(z);
            for (const z of source10[Symbol.iterator]())
                constrainExact()(z);
        }
        for (const z of source10)
            constrainExact()(z);
        if (source11.a) {
            for (const z of source11)
                constrainExact()(z);
        }
        for (const z of source11)
            constrainExact()(z);
        const [h] = [...(source11.a ? [...source11] : source11.a === false && [...source11])];
        constrainExact()(h);
        for (const z of source12)
            constrainExact()(z);
    });
}

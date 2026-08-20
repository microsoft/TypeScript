// @target: esnext
// @strict: true
// @noEmit: true

declare let _: any;
declare const g1: Generator<number, void, string>;
declare const g2: Generator<number, void, undefined>;
declare const g3: Generator<number, void, boolean>;
declare const g4: AsyncGenerator<number, void, string>;
declare const g5: AsyncGenerator<number, void, undefined>;
declare const g6: AsyncGenerator<number, void, boolean>;

// spread iterable
[...g1]; // error
[...g2]; // ok

// binding pattern over iterable
let [x1] = g1; // error
let [x2] = g2; // ok

// binding rest pattern over iterable
let [...y1] = g1; // error
let [...y2] = g2; // ok

// assignment pattern over iterable
[_] = g1; // error
[_] = g2; // ok

// assignment rest pattern over iterable
[..._] = g1; // error
[..._] = g2; // ok

// for-of over iterable
for (_ of g1); // error
for (_ of g2); // ok

async function asyncfn() {
    // for-await-of over iterable
    for await (_ of g1); // error
    for await (_ of g2); // ok

    // for-await-of over asynciterable
    for await (_ of g4); // error
    for await (_ of g5); // ok
}

function* f1(): Generator<number, void, boolean> {
    // yield* over iterable
    yield* g1; // error
    yield* g3; // ok
}

async function* f2(): AsyncGenerator<number, void, boolean> {
    // yield* over iterable
    yield* g1; // error
    yield* g3; // ok

    // yield* over asynciterable
    yield* g4; // error
    yield* g6; // ok
}

async function f3() {
    const syncGenerator = function*() {
        yield 1;
        yield 2;
    };

    const o = {[Symbol.asyncIterator]: syncGenerator};

    for await (const x of o) {
    }
}

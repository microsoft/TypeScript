// @target: esnext
// @strictNullChecks: true
// @noImplicitReturns: true
// @noImplicitAny: true

declare const iterableIterator: IterableIterator<number>;
declare const generator: Generator<number, string, boolean>;
declare const never: never;

// 'yield' iteration type inference
function* g001() { // Generator<undefined, void, unknown>
    yield;
}

function* g002() { // Generator<number, void, unknown>
    yield 1;
}

function* g003() { // Generator<never, void, unknown>
    yield* [];
}

function* g004() { // Generator<number, void, unknown>
    yield* iterableIterator;
}

function* g005() { // Generator<number, void, boolean>
    yield* generator;
}

function* g006() { // Generator<1 | 2, void, unknown>
    yield 1;
    yield 2;
}

function* g007() { // Generator<never, void, unknown>
    yield never;
}

// 'return' iteration type inference
function* g102() { // Generator<never, number, unknown>
    return 1;
}

function* g103() { // Generator<never, 1 | 2, unknown>
    if (Math.random()) return 1;
    return 2;
}

function* g104() { // Generator<never, never, unknown>
    return never;
}

// 'next' iteration type inference
function* g201() { // Generator<number, void, string>
    let a: string = yield 1;
}

function* g202() { // Generator<1 | 2, void, string & number>
    let a: string = yield 1;
    let b: number = yield 2;
}

// mixed iteration types inference

function* g301() { // Generator<undefined, void, unknown>
    yield;
    return;
}

function* g302() { // Generator<number, void, unknown>
    yield 1;
    return;
}

function* g303() { // Generator<undefined, string, unknown>
    yield;
    return "a";
}

function* g304() { // Generator<number, string, unknown>
    yield 1;
    return "a";
}

function* g305() { // Generator<1 | 2, "a" | "b", unknown>
    if (Math.random()) yield 1;
    yield 2;
    if (Math.random()) return "a";
    return "b";
}

function* g306() { // Generator<number, boolean, "hi">
    const a: "hi" = yield 1;
    return true;
}

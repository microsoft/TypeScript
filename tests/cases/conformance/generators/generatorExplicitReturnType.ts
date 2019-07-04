// @target: esnext
// @strictNullChecks: true
// @noImplicitReturns: true
// @noImplicitAny: true

function* g1(): Generator<number, boolean, string> {
    yield; // error
    yield "a"; // error
    const x: number = yield 1; // error
    return 10; // error
}

function* g2(): Generator<number, boolean, string> {
    const x = yield 1;
    return true;
}

declare const generator: Generator<number, symbol, string>;

function* g3(): Generator<number, boolean, string> {
    const x: number = yield* generator; // error
    return true;
}

function* g4(): Generator<number, boolean, string> {
    const x = yield* generator;
    return true;
}
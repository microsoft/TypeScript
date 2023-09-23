//// [tests/cases/conformance/generators/generatorImplicitAny.ts] ////

//// [generatorImplicitAny.ts]
function* g() {}

// https://github.com/microsoft/TypeScript/issues/35105
declare function noop(): void;
declare function f<T>(value: T): void;

function* g2() {
    const value = yield; // error: implicit any
}

function* g3() {
    const value: string = yield; // ok, contextually typed by `value`.
}

function* g4() {
    yield; // ok, result is unused
    yield, noop(); // ok, result is unused
    noop(), yield, noop(); // ok, result is unused
    (yield); // ok, result is unused
    (yield, noop()), noop(); // ok, result is unused
    for(yield; false; yield); // ok, results are unused
    void (yield); // ok, results are unused
}

function* g5() {
    f(yield); // error: implicit any
}

function* g6() {
    f<string>(yield); // ok, contextually typed by f<string>
}

//// [generatorImplicitAny.js]
function* g() { }
function* g2() {
    const value = yield; // error: implicit any
}
function* g3() {
    const value = yield; // ok, contextually typed by `value`.
}
function* g4() {
    yield; // ok, result is unused
    yield, noop(); // ok, result is unused
    noop(), yield, noop(); // ok, result is unused
    (yield); // ok, result is unused
    (yield, noop()), noop(); // ok, result is unused
    for (yield; false; yield)
        ; // ok, results are unused
    void (yield); // ok, results are unused
}
function* g5() {
    f(yield); // error: implicit any
}
function* g6() {
    f(yield); // ok, contextually typed by f<string>
}

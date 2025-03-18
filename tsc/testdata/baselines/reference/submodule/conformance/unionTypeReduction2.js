//// [tests/cases/conformance/types/union/unionTypeReduction2.ts] ////

//// [unionTypeReduction2.ts]
function f1(x: { f(): void }, y: { f(x?: string): void }) {
    let z = !!true ? x : y;  // { f(x?: string): void }
    z.f();
    z.f('hello');
}

function f2(x: { f(x: string | undefined): void }, y: { f(x?: string): void }) {
    let z = !!true ? x : y;  // { f(x?: string): void }
    z.f();
    z.f('hello');
}

function f3(x: () => void, y: (x?: string) => void) {
    let f = !!true ? x : y;  // (x?: string) => void
    f();
    f('hello');
}

function f4(x: (x: string | undefined) => void, y: (x?: string) => void) {
    let f = !!true ? x : y;  // (x?: string) => void
    f();
    f('hello');
}

function f5(x: (x: string | undefined) => void, y: (x?: 'hello') => void) {
    let f = !!true ? x : y;  // (x?: 'hello') => void
    f();
    f('hello');
}

function f6(x: (x: 'hello' | undefined) => void, y: (x?: string) => void) {
    let f = !!true ? x : y;  // (x: 'hello' | undefined) => void
    f();  // Error
    f('hello');
}

type A = {
    f(): void;
}

type B = {
    f(x?: string): void;
    g(): void;
}

function f11(a: A, b: B) {
    let z = !!true ? a : b;  // A | B
    z.f();
    z.f('hello');
}

// Repro from #35414

interface ReturnVal {
    something(): void;
}

const k: ReturnVal = { something() { } }

declare const val: ReturnVal;
function run(options: { something?(b?: string): void }) {
    const something = options.something ?? val.something;
    something('');
}


//// [unionTypeReduction2.js]
function f1(x, y) {
    let z = !!true ? x : y;
    z.f();
    z.f('hello');
}
function f2(x, y) {
    let z = !!true ? x : y;
    z.f();
    z.f('hello');
}
function f3(x, y) {
    let f = !!true ? x : y;
    f();
    f('hello');
}
function f4(x, y) {
    let f = !!true ? x : y;
    f();
    f('hello');
}
function f5(x, y) {
    let f = !!true ? x : y;
    f();
    f('hello');
}
function f6(x, y) {
    let f = !!true ? x : y;
    f();
    f('hello');
}
function f11(a, b) {
    let z = !!true ? a : b;
    z.f();
    z.f('hello');
}
const k = { something() { } };
function run(options) {
    const something = options.something ?? val.something;
    something('');
}

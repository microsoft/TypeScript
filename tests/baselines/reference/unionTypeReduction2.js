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
"use strict";
function f1(x, y) {
    var z = !!true ? x : y; // { f(x?: string): void }
    z.f();
    z.f('hello');
}
function f2(x, y) {
    var z = !!true ? x : y; // { f(x?: string): void }
    z.f();
    z.f('hello');
}
function f3(x, y) {
    var f = !!true ? x : y; // (x?: string) => void
    f();
    f('hello');
}
function f4(x, y) {
    var f = !!true ? x : y; // (x?: string) => void
    f();
    f('hello');
}
function f5(x, y) {
    var f = !!true ? x : y; // (x?: 'hello') => void
    f();
    f('hello');
}
function f6(x, y) {
    var f = !!true ? x : y; // (x: 'hello' | undefined) => void
    f(); // Error
    f('hello');
}
function f11(a, b) {
    var z = !!true ? a : b; // A | B
    z.f();
    z.f('hello');
}
var k = { something: function () { } };
function run(options) {
    var _a;
    var something = (_a = options.something) !== null && _a !== void 0 ? _a : val.something;
    something('');
}

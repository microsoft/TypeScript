//// [strictSubtypeAndNarrowing.ts]
// Check that `any` is a strict supertype of `unknown`

declare const x11: { x: unknown };
declare const x12: { x: any };

const a11 = [x11, x12];
const a12 = [x12, x11];

declare const x21: { x: any };
declare const x22: { x: unknown };

const a21 = [x22, x21];
const a22 = [x21, x22];

// Strict subtype doesn't infer index signatures in non-fresh object types

const x31 = { a: 1 };
declare const x32: { [x: string]: unknown, a: number }

const a31 = [x31, x32];
const a32 = [x32, x31];

declare const x41: { [x: string]: unknown, a: number }
const x42 = { a: 1 };

const a41 = [x42, x41];
const a42 = [x41, x42];

// (...args: A) => R, where A is any, any[], never, or never[] and R is any or unknown, is supertype of all function types.

declare function isFunction<T>(x: unknown): x is T;

type A = (...args: any) => unknown;
type B = (...args: any[]) => unknown;
type C = (...args: never) => unknown;
type D = (...args: never[]) => unknown;

type FnTypes = A | B | C | D;

function fx1(f: (() => void) | undefined) {
    if (isFunction<A>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx2(f: (() => void) | undefined) {
    if (isFunction<B>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx3(f: (() => void) | undefined) {
    if (isFunction<C>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx4(f: (() => void) | undefined) {
    if (isFunction<D>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function checkA(f: FnTypes) {
    if (isFunction<A>(f)) {
        f;  // A | B
    }
    else {
        f;  // C | D
    }
    f;  // FnTypes
}

function checkB(f: FnTypes) {
    if (isFunction<B>(f)) {
        f;  // A | B
    }
    else {
        f;  // C | D
    }
    f;  // FnTypes
}

function checkC(f: FnTypes) {
    if (isFunction<C>(f)) {
        f;  // FnTypes
    }
    else {
        f;  // never
    }
    f;  // FnTypes
}

function checkD(f: FnTypes) {
    if (isFunction<C>(f)) {
        f;  // FnTypes
    }
    else {
        f;  // never
    }
    f;  // FnTypes
}

// Type of x = y is y with freshness preserved

function fx10(obj1: { x?: number }, obj2: { x?: number, y?: number }) {
    obj1 = obj2 = { x: 1, y: 2 };
    obj2 = obj1 = { x: 1, y: 2 };
}

function fx11(): { x?: number } {
    let obj: { x?: number, y?: number };
    return obj = { x: 1, y: 2 };
}


//// [strictSubtypeAndNarrowing.js]
"use strict";
// Check that `any` is a strict supertype of `unknown`
var a11 = [x11, x12];
var a12 = [x12, x11];
var a21 = [x22, x21];
var a22 = [x21, x22];
// Strict subtype doesn't infer index signatures in non-fresh object types
var x31 = { a: 1 };
var a31 = [x31, x32];
var a32 = [x32, x31];
var x42 = { a: 1 };
var a41 = [x42, x41];
var a42 = [x41, x42];
function fx1(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx2(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx3(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx4(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function checkA(f) {
    if (isFunction(f)) {
        f; // A | B
    }
    else {
        f; // C | D
    }
    f; // FnTypes
}
function checkB(f) {
    if (isFunction(f)) {
        f; // A | B
    }
    else {
        f; // C | D
    }
    f; // FnTypes
}
function checkC(f) {
    if (isFunction(f)) {
        f; // FnTypes
    }
    else {
        f; // never
    }
    f; // FnTypes
}
function checkD(f) {
    if (isFunction(f)) {
        f; // FnTypes
    }
    else {
        f; // never
    }
    f; // FnTypes
}
// Type of x = y is y with freshness preserved
function fx10(obj1, obj2) {
    obj1 = obj2 = { x: 1, y: 2 };
    obj2 = obj1 = { x: 1, y: 2 };
}
function fx11() {
    var obj;
    return obj = { x: 1, y: 2 };
}

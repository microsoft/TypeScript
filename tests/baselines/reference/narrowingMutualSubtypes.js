//// [narrowingMutualSubtypes.ts]
// Check that `any` is a strict supertype of `unknown`

declare const ru1: { [x: string]: unknown };
declare const ra1: { [x: string]: any };

const a1a = [ru1, ra1];  // { [x: string]: any }[]
const a1b = [ra1, ru1];  // { [x: string]: any }[]

declare const ra2: { [x: string]: any };
declare const ru2: { [x: string]: unknown };

const a2a = [ru2, ra2];  // { [x: string]: any }[]
const a2b = [ra2, ru2];  // { [x: string]: any }[]

// Check that `{}` is strict supertype of any non-empty object

const c3 = {};
declare const r3: { [x: string]: unknown }

const a3a = [c3, r3];  // {}[]
const a3b = [r3, c3];  // {}[]

declare const r4: { [x: string]: unknown }
const c4 = {};

const a4a = [c4, r4];  // {}[]
const a4b = [r4, c4];  // {}[]

// Check that narrowing preserves original type in false branch for non-identical mutual subtypes

declare function isObject1(value: unknown): value is Record<string, unknown>;

function gg(x: {}) {
    if (isObject1(x)) {
        x;  // Record<string, unknown>
    }
    else {
        x;  // {}
    }
    x;  // {}
}

declare function isObject2(value: unknown): value is {};

function gg2(x: Record<string, unknown>) {
    if (isObject2(x)) {
        x;  // {}
    }
    else {
        x;  // Record<string, unknown>
    }
    x;  // Record<string, unknown>
}

// Repro from #50916

type Identity<T> = {[K in keyof T]: T[K]};

type Self<T> = T extends unknown ? Identity<T> : never;

function is<T>(value: T): value is Self<T> {
    return true;
}

type Union =  {a: number} | {b: number} | {c: number};

function example(x: Union) {
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    x;  // Union
}


//// [narrowingMutualSubtypes.js]
"use strict";
// Check that `any` is a strict supertype of `unknown`
var a1a = [ru1, ra1]; // { [x: string]: any }[]
var a1b = [ra1, ru1]; // { [x: string]: any }[]
var a2a = [ru2, ra2]; // { [x: string]: any }[]
var a2b = [ra2, ru2]; // { [x: string]: any }[]
// Check that `{}` is strict supertype of any non-empty object
var c3 = {};
var a3a = [c3, r3]; // {}[]
var a3b = [r3, c3]; // {}[]
var c4 = {};
var a4a = [c4, r4]; // {}[]
var a4b = [r4, c4]; // {}[]
function gg(x) {
    if (isObject1(x)) {
        x; // Record<string, unknown>
    }
    else {
        x; // {}
    }
    x; // {}
}
function gg2(x) {
    if (isObject2(x)) {
        x; // {}
    }
    else {
        x; // Record<string, unknown>
    }
    x; // Record<string, unknown>
}
function is(value) {
    return true;
}
function example(x) {
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    if (is(x)) { }
    x; // Union
}

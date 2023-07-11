//// [tests/cases/compiler/narrowingMutualSubtypes.ts] ////

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

// Check that {} is a strict supertype of Record<string, unknown>

declare function isObject1(value: unknown): value is Record<string, unknown>;

function gg1(x: {}) {
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
        x;  // Record<string, unknown>
    }
    else {
        x;  // never
    }
    x;  // Record<string, unknown>
}

// Check that {} is a strict supertype of Record<string, any>

declare function isObject3(value: unknown): value is Record<string, any>;

function gg3(x: {}) {
    if (isObject3(x)) {
        x;  // Record<string, any>
    }
    else {
        x;  // {}
    }
    x;  // {}
}

declare function isObject4(value: unknown): value is {};

function gg4(x: Record<string, any>) {
    if (isObject4(x)) {
        x;  // Record<string, any>
    }
    else {
        x;  // never
    }
    x;  // Record<string, any>
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

function checksArrayOrObject1(obj: Record<string, any> | Record<string, any>[]) {
    // "accidentally" guards the first branch on the length
    if (Array.isArray(obj) && obj.length) {
        for (let key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key])
            }
        }
    }
    else {
        // 'obj' should probably not include an array type here.
        for (let key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key])
            }
        }
    }
}

function checksArrayOrObject2(obj: Record<string, any> | Record<string, any>[]) {
    if (Array.isArray(obj)) {
        // obj should only be an array type here
        for (let key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key])
            }
        }
    }
    else {
        // 'obj' should probably not include an array type here.
        for (let key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key])
            }
        }
    }
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
function gg1(x) {
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
        x; // Record<string, unknown>
    }
    else {
        x; // never
    }
    x; // Record<string, unknown>
}
function gg3(x) {
    if (isObject3(x)) {
        x; // Record<string, any>
    }
    else {
        x; // {}
    }
    x; // {}
}
function gg4(x) {
    if (isObject4(x)) {
        x; // Record<string, any>
    }
    else {
        x; // never
    }
    x; // Record<string, any>
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
function checksArrayOrObject1(obj) {
    // "accidentally" guards the first branch on the length
    if (Array.isArray(obj) && obj.length) {
        for (var key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key]);
            }
        }
    }
    else {
        // 'obj' should probably not include an array type here.
        for (var key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key]);
            }
        }
    }
}
function checksArrayOrObject2(obj) {
    if (Array.isArray(obj)) {
        // obj should only be an array type here
        for (var key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key]);
            }
        }
    }
    else {
        // 'obj' should probably not include an array type here.
        for (var key in obj) {
            if (obj[key] !== undefined) {
                console.log(obj[key]);
            }
        }
    }
}

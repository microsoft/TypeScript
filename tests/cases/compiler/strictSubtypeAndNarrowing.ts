// @strict: true

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

// (...args: any[]) => any is supertype of all other function types

declare function isFunction(x: unknown): x is (...args: any[]) => any;

function qqq(f: (() => void) | undefined) {
    if (isFunction(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
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

// Narrowing preserves original type in false branch for non-identical mutual subtypes

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

function is<T>(value: T): value is Identity<T> {
    return true;
}

type Union =  {a: number} | {b: number} | {c: number};

function example(x: Union) {
    if (is(x)) { x }
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    if (is(x)) {}
    x;  // Union
}

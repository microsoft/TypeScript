// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64495

function f1<K1 extends string, T, K2 extends string, U>(x: Record<K1, T> & Record<K2, U>): Record<K1 | K2, T & U> {
    return x; // Error
}

function f2<K1 extends string, T, K2 extends string, U>(x: Record<K1, T> & Record<K2, U>): Record<K1 | K2, T | U> {
    return x;
}

function f3<K extends string, T, U>(x: Record<K, T> & Record<K, U>): Record<K, T & U> {
    return x;
}

function f4<K1 extends string, T, K2 extends string, U>(x: Record<K1, T> & Record<K2, U>, k1: K1, k2: K2) {
    const t: T = x[k1];
    const u: U = x[k2];
    const tu1: T & U = x[k1]; // Error
    const tu2: T & U = x[k2]; // Error
}

function f5<K1 extends string, T extends { a: string }, K2 extends string, U extends { b: string }>(x: Record<K1, T> & Record<K2, U>, k1: K1, k2: K2) {
    x[k1].a;
    x[k1].b; // Error
    x[k2].a; // Error
    x[k2].b;
}

function f6<K1 extends string, T, K2 extends K1, U>(x: Record<K1, T> & Record<K2, U>, k1: K1, k2: K2) {
    const t: T = x[k2];
    const u: U = x[k2];
    const tu: T & U = x[k2];
    const tu1: T & U = x[k1]; // Error
}

function f7<K1 extends string, T, K2 extends string, U, V>(x: Record<K1, T> & Record<K2, U> & { extra: V }, k1: K1) {
    const t: T = x[k1];
    const tu: T & U = x[k1]; // Error
}

function f8<K1 extends string, T, K2 extends string, U, V>(x: Record<K1, T> & Record<K2, U> & { [key: string]: V }, k1: K1) {
    const tv: T & V = x[k1];
    const tu: T & U = x[k1]; // Error
}

function f9<K1 extends string, K2 extends string, K3 extends K1 | K2>(x: Record<K1, number> & Record<K2, number> & Record<K3, unknown>, k3: K3) {
    const n: number = x[k3];
}

function f10<K1 extends number, T, K2 extends number, U, V>(x: Record<K1, T> & Record<K2, U> & Record<string, V>, k1: K1) {
    const tv: T & V = x[k1];
}

function f11<K extends "a", T, K2 extends string, U>(x: Record<K2, U> & { a: T }, k: K) {
    const t: T = x[k];
    const tu: T & U = x[k]; // Error
}

function f12<K extends string, X extends K, T, U>(x: Record<K, T | U> & { metadata: number }, k: X): T | U {
    return x[k];
}

function f13<K extends 1 | 2, T>(x: Record<K, unknown> & Record<`${K}`, T>, k: K): T {
    return x[k];
}

function f14<K extends 1 | 2>(x: Record<K, number> & Record<`${K}`, unknown>, k: `${K}`): number {
    return x[k];
}

function f15<K extends number, X extends K>(x: { [P in `${X}`]: P } & Record<K, unknown>, k: X): X {
    return x[k]; // Error
}

function f16<K extends string>(x: Record<K, unknown> & Record<`${K}`, number>, k: K): number {
    return x[k];
}

function f17<K extends number, X extends K>(x: Record<K, unknown> & Record<`${X}`, number>, k: X): number {
    return x[k];
}

function f18<K extends string, X extends "a" | "b">(x: Record<K | "a", number> & { b: number }, k: X): number {
    return x[k];
}

function f19<K1 extends string, T, K2 extends string, U, X extends K1 | "b">(x: Record<K1, T> & Record<K2, U> & { b: T }, k: X) {
    const t: T = x[k];
    const tu: T & U = x[k]; // Error
}

function f20<K1 extends string, K2 extends string, X extends K1 | "b">(x: Record<K1, number> & Record<K2, number> & { b: string }, k: X): number {
    return x[k]; // Error
}

function f21<K1 extends string, K2 extends string, X extends K1>(x: Record<K1, { a: string }> & Record<K2, { b: string }>, k: X) {
    x[k].a;
    x[k].b; // Error
}

function f22<K extends string, X extends K, L extends string, T, U>(x: Record<X, T> & Record<L, U>, k: X) {
    const t: T = x[k];
    const tu: T & U = x[k]; // Error
}

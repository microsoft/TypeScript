// @strict

function f1(a: <T>() => keyof T, b: <U>() => keyof U) {
    a = b;
    b = a;
}

function f2(a: <T, K extends keyof T>() => T[K], b: <U, L extends keyof U>() => U[L]) {
    a = b;
    b = a;
}

function f3(a: <T>() => { [K in keyof T]: T[K] }, b: <U>() => { [K in keyof U]: U[K] }) {
    a = b;
    b = a;
}

// Repro from #18338

type IdMapped<T> = { [K in keyof T]: T[K] }

declare const f: <T>() => IdMapped<T>;
declare const g: <U>() => { [K in keyof U]: U[K] };

const h: typeof g = f;

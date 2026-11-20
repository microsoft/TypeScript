// @strict: true
// @noUncheckedIndexedAccess: true
// @noEmit: true
// @checkOrder: default, typesfirst

function f<T extends Record<string, string>, K extends keyof T>(obj: T, k: K, b: boolean) {
    const x = b ? obj[k] : g<T, K>();
    const s1: string = x;
    const y = b ? g<T, K>() : obj[k];
    const s2: string = y;
}

declare function g<T, K extends keyof T>(): T[K];

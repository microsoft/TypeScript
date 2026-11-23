// @strict: true
// @noEmit: true

// An indexed access type with a union index must be the same type wherever
// it is written, whatever flags the access was made with, as reading and
// writing the same type are related by identity.

function f<T, K1 extends keyof T, K2 extends keyof T>(obj: T, key: K1 | K2) {
    const value: T[K1 | K2] = obj[key];
    return value;
}

declare function set<T>(obj: T, key: keyof T, value: T[keyof T]): void;
function g<A, B>(obj: A & B, key: keyof (A & B)) {
    set<A & B>(obj, key, obj[key]);
}

function h<T, K1 extends keyof T, K2 extends keyof T>(obj: T, key: K1 | K2) {
    const a = obj[key];
    const value: typeof a = obj[key];
    return value;
}

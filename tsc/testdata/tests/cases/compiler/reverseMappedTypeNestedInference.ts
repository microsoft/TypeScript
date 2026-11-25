// @strict: true
// @declaration: true

declare const sv: (input: unknown) => string | undefined;

declare function d3<T>(input: { [K in keyof T]: { [J in keyof T[K]]: { [L in keyof T[K][J]]: (i: unknown) => T[K][J][L] } } }): T;
export const r3 = d3({ a: { b: { c: sv } } });

declare function d4<T>(input: { [K in keyof T]: { [J in keyof T[K]]: { [L in keyof T[K][J]]: { [M in keyof T[K][J][L]]: (i: unknown) => T[K][J][L][M] } } } }): T;
export const r4 = d4({ a: { b: { c: { d: sv } } } });

type Deep2<T> = { [K in keyof T]: { [J in keyof T[K]]: Deep2<T[K][J]> | ((i: unknown) => T[K][J]) } };
declare function dd<T>(input: Deep2<T>): T;
export const rd = dd({ a: { b: { c: { d: sv } } } });

declare function dk<T, U extends keyof T>(input: { [K in keyof T]: { [J in keyof T[K]]: (i: unknown) => T[K][J] } }, k: U): T[U];
export const rk = dk({ a: { b: sv } }, "a");

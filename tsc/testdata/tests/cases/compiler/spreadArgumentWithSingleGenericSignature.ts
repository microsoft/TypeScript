// @strict: true
// @noEmit: true

declare function apply<A, R>(f: (a: A) => R, a: A): R;
declare const args: [<T>(x: T) => T[], number];
const r = apply(...args);

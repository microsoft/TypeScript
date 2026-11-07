// @target: es2015

// https://github.com/microsoft/TypeScript/issues/37760

function alignof<T>(): number { return 1; }

function f1<T>(): number { return 1 << alignof<T[]>(); }
function f2<T>(): number { return 1 >> alignof<T[]>(); }
function f3<T>(): number { return 1 >>> alignof<T[]>(); }
function f4<T>(): number { return 1 << (alignof<T[]>()); }
function f5<T>(x: number): number { x <<= alignof<T[]>(); return x; }
function f6<T>(x: number): number { x >>= alignof<T[]>(); return x; }
function f7<T>(x: number): number { x >>>= alignof<T[]>(); return x; }
function f8<T>(): number { return 1 < alignof<T[]>() ? 1 : 0; }
function f9(): number { return 1 << alignof<string>(); }

// `<<` that starts a type argument list with a generic function type is still a type argument list.
declare function g<F>(f: F): F;
const h = g<<U>(x: U) => U>((x) => x);
const n: number = h(1);

// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/64172#issuecomment-5591499161

// @filename: recursiveFirst.ts
interface Schema<O> { readonly out: O; }
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };

const t = object({
    get rec() { return t; },
    get bad() { return 42; },
});

export {};

// @filename: invalidFirst.ts
interface Schema<O> { readonly out: O; }
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };

const t = object({
    get bad() { return 42; },
    get rec() { return t; },
});

export {};

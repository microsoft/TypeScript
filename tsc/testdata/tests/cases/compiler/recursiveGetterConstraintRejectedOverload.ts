// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/64172#issuecomment-5591499161

interface Schema<O> { readonly out: O; }
type Shape = Record<string, Schema<any>>;

declare function object<S extends Shape>(shape: S, mode: "strict"): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };
declare function object(shape: object, mode: "loose"): { out: unknown; shape: object };

const tree = object({
    get bad() { return [tree]; },
}, "loose");

const wrongTree: number = tree;

declare const value: { out: unknown; shape: object }[];
const nonrecursive = object({
    get bad() { return value; },
}, "loose");

const wrongNonrecursive: number = nonrecursive;

export {};

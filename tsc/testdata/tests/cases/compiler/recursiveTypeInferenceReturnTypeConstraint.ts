// @strict: true
// @noEmit: true

// A pure return type inference stays filtered by its constraint in a recursive call resolution.

interface Schema<O> { readonly out: O }
type Shape = Record<string, Schema<any>>;
type Lookup = { x: 1; dflt: 2 };
declare function object<S extends Shape, P extends keyof Lookup>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { p: P; q: Lookup[P]; f: (x: P) => void };
declare const str: Schema<string>;

const u = object({ name: str }) satisfies { p: number | "x" };
u.f(42); // error

const t = object({ name: str, get rec() { return object({ inner: t }); } }) satisfies { p: number | "x" };
t.f(42); // error
const tq: 1 = t.q;

const a = object({ name: str, get r() { return b; } }) satisfies { p: number | "x" };
const b = object({ name: str, get r() { return a; } }) satisfies { p: number | "x" };
const aq: 1 = a.q;
const bq: 1 = b.q;

declare function pick(x: { p: "x" }): Schema<"picked-x">;
declare function pick(x: { p: number | "x" }): Schema<"picked-wide">;
const s = object({ name: str, get rec() { return pick(s); } }) satisfies { p: number | "x" };
const sk: "picked-x" = pick(s).out;

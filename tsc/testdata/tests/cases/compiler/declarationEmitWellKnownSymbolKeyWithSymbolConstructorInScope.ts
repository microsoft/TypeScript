// @target: esnext
// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// A value of type SymbolConstructor in scope must not turn `[Symbol.iterator]` keys into
// `[SymbolConstructor.iterator]`, which names an interface where a value is needed.

// @filename: variable.ts
const S = Symbol;
export const range = { *[Symbol.iterator]() { yield 1; } };

// @filename: parameter.ts
export function make(s: SymbolConstructor) {
    return { *[Symbol.iterator]() { yield 1; } };
}

// @filename: others.ts
const S = Symbol;
export const tagged = { [Symbol.toStringTag]: "x", async *[Symbol.asyncIterator]() { yield 1; } };

// @filename: nested.ts
export function inner() {
    const T = Symbol;
    return { *[Symbol.iterator]() { yield 1; } };
}

// @filename: written.ts
const S = Symbol;
export const written = { *[S.iterator]() { yield 1; } };

// @filename: reexport.ts
import { range } from "./variable";
export const again = range;


// @filename: narrowed.ts
declare const k: typeof Symbol.iterator | undefined;
export function make() {
    if (k === undefined) throw 0;
    return { [k]: 1 };
}

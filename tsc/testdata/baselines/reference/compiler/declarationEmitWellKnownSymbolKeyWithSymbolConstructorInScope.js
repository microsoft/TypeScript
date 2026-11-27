//// [tests/cases/compiler/declarationEmitWellKnownSymbolKeyWithSymbolConstructorInScope.ts] ////

//// [variable.ts]
const S = Symbol;
export const range = { *[Symbol.iterator]() { yield 1; } };

//// [parameter.ts]
export function make(s: SymbolConstructor) {
    return { *[Symbol.iterator]() { yield 1; } };
}

//// [others.ts]
const S = Symbol;
export const tagged = { [Symbol.toStringTag]: "x", async *[Symbol.asyncIterator]() { yield 1; } };

//// [nested.ts]
export function inner() {
    const T = Symbol;
    return { *[Symbol.iterator]() { yield 1; } };
}

//// [written.ts]
const S = Symbol;
export const written = { *[S.iterator]() { yield 1; } };

//// [reexport.ts]
import { range } from "./variable";
export const again = range;


//// [narrowed.ts]
declare const k: typeof Symbol.iterator | undefined;
export function make() {
    if (k === undefined) throw 0;
    return { [k]: 1 };
}




//// [variable.d.ts]
export declare const range: {
    [Symbol.iterator](): Generator<number, void, unknown>;
};
//// [parameter.d.ts]
export declare function make(s: SymbolConstructor): {
    [Symbol.iterator](): Generator<number, void, unknown>;
};
//// [others.d.ts]
export declare const tagged: {
    [Symbol.toStringTag]: string;
    [Symbol.asyncIterator](): AsyncGenerator<number, void, unknown>;
};
//// [nested.d.ts]
export declare function inner(): {
    [Symbol.iterator](): Generator<number, void, unknown>;
};
//// [written.d.ts]
declare const S: SymbolConstructor;
export declare const written: {
    [S.iterator](): Generator<number, void, unknown>;
};
export {};
//// [reexport.d.ts]
export declare const again: {
    [Symbol.iterator](): Generator<number, void, unknown>;
};
//// [narrowed.d.ts]
declare const k: typeof Symbol.iterator | undefined;
export declare function make(): {
    [Symbol.iterator]: number;
};
export {};

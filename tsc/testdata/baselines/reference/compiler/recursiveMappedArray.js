//// [tests/cases/compiler/recursiveMappedArray.ts] ////

//// [recursiveMappedArray.ts]
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });


//// [recursiveMappedArray.js]
export const value = wrap({ items: [] });


//// [recursiveMappedArray.d.ts]
type Json = string | Json[];
type Parsed<T> = T extends object ? {
    [K in keyof T]: Parsed<T[K]>;
} : T;
export declare const value: {
    items: Parsed<Json[]>;
};
export {};

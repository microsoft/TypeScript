//// [tests/cases/compiler/deferredMappedTypeAliasInstantiation.ts] ////

//// [deferredMappedTypeAliasInstantiation.ts]
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function direct<T>(value: T): Parsed<T>;
declare function indirect<U>(value: U): { concrete: Parsed<string[]>; recursive: Parsed<Json[]>; generic: Parsed<U[]> };
export const concrete = direct([] as string[]);
export const recursive = direct([] as Json[]);
export const instantiated = indirect(1);
const numeric: number[] = instantiated.generic;
instantiated.generic[0] = "error";

function generic<T>(value: T) {
    return indirect(value);
}
export const twice = generic(true);
const boolean: boolean[] = twice.generic;
twice.generic[0] = "error";


//// [deferredMappedTypeAliasInstantiation.js]
export const concrete = direct([]);
export const recursive = direct([]);
export const instantiated = indirect(1);
const numeric = instantiated.generic;
instantiated.generic[0] = "error";
function generic(value) {
    return indirect(value);
}
export const twice = generic(true);
const boolean = twice.generic;
twice.generic[0] = "error";


//// [deferredMappedTypeAliasInstantiation.d.ts]
type Json = string | Json[];
type Parsed<T> = T extends object ? {
    [K in keyof T]: Parsed<T[K]>;
} : T;
export declare const concrete: string[];
export declare const recursive: any;
export declare const instantiated: {
    concrete: Parsed<string[]>;
    recursive: Parsed<Json[]>;
    generic: number[];
};
export declare const twice: {
    concrete: Parsed<string[]>;
    recursive: Parsed<Json[]>;
    generic: boolean[];
};
export {};

//// [tests/cases/compiler/recursiveContainerDeclarationSerialization.ts] ////

//// [local.ts]
export function array() {
    type Recursive = Recursive[];
    return null as unknown as Recursive;
}
export function tuple() {
    type Recursive = [Recursive];
    return null as unknown as Recursive;
}
export function readonlyTuple() {
    type Recursive = readonly [Recursive];
    return null as unknown as Recursive;
}
export function union() {
    type Recursive = string | Recursive[];
    return null as unknown as Recursive;
}

//// [nameable.ts]
export type RecursiveArray = RecursiveArray[];
export type RecursiveTuple = readonly [RecursiveTuple];
declare const array: RecursiveArray;
declare const tuple: RecursiveTuple;
export const namedArray = array;
export const namedTuple = tuple;
export function finite() {
    type Nested = [[[[[[[[[[[[[number]]]]]]]]]]]]];
    return null as unknown as Nested;
}
export function finiteArray() {
    type Nested = number[][][][][][][][][][][][][];
    return null as unknown as Nested;
}

//// [expanding.ts]
// Each level is a new instantiation, so printing it stops at a bounded depth.
type G<T> = T extends unknown ? (T | G<[T]>)[] : never;
declare const g: G<"x">;
export const h = g;
export const n: number = g;


//// [local.js]
export function array() {
    return null;
}
export function tuple() {
    return null;
}
export function readonlyTuple() {
    return null;
}
export function union() {
    return null;
}
//// [nameable.js]
export const namedArray = array;
export const namedTuple = tuple;
export function finite() {
    return null;
}
export function finiteArray() {
    return null;
}
//// [expanding.js]
export const h = g;
export const n = g;


//// [nameable.d.ts]
export type RecursiveArray = RecursiveArray[];
export type RecursiveTuple = readonly [RecursiveTuple];
export declare const namedArray: RecursiveArray;
export declare const namedTuple: RecursiveTuple;
export declare function finite(): [[[[[[[[[[[[[number]]]]]]]]]]]]];
export declare function finiteArray(): number[][][][][][][][][][][][][];

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


//// [local.d.ts]
type _recursive = _recursive[];
type _recursive_1 = [_recursive_1];
type _recursive_2 = readonly [_recursive_2];
type _recursive_3 = (string | _recursive_3)[];
export declare function array(): _recursive;
export declare function tuple(): _recursive_1;
export declare function readonlyTuple(): _recursive_2;
export declare function union(): string | _recursive_3;
export {};
//// [nameable.d.ts]
export type RecursiveArray = RecursiveArray[];
export type RecursiveTuple = readonly [RecursiveTuple];
export declare const namedArray: RecursiveArray;
export declare const namedTuple: RecursiveTuple;
export declare function finite(): [[[[[[[[[[[[[number]]]]]]]]]]]]];
export declare function finiteArray(): number[][][][][][][][][][][][][];

// @module: commonjs
// @target: es2015
// @isolatedDeclarations: true
// @declaration: true
// @strict: true
// @filename: file1.ts

type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

// @filename: file2.ts

export function foo(p = (ip = 10, v: number): void => {}): void{
}
type T = number
export function foo2(p = (ip = 10 as T, v: number): void => {}): void{}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

// @filename: file3.ts

type T = number;
export const intersection = (p = 1 as number & (T | undefined), required: number): void => {};
export const reversedIntersection = (p = 1 as (T | undefined) & number, required: number): void => {};
export const possiblyUndefinedIntersection = (p = undefined as (T | undefined) & (number | undefined), required: number): void => {};
export const anyIntersection = (p = "" as any & (T | undefined), required: number): void => {};
export const unknownIntersection = (p = undefined as unknown & (T | undefined), required: number): void => {};
export const neverIntersection = (p = undefined as never & (T | undefined), required: number): void => {};
type MaybeNumber = number | undefined;
export const aliasIntersection = (p = 1 as MaybeNumber & (T | undefined), required: number): void => {};
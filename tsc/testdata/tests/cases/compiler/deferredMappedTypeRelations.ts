// @strict: true

type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;
type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;

declare const array: Deep<string[][][][]>;
const badArray: Deep<number[][][][]> = array;
const goodArray: Deep<string[][][][]> = array;

declare const tuple: Deep<[[[[string]]]]>;
const badTuple: Deep<[[[[number]]]]> = tuple;
const goodTuple: Deep<[[[[string]]]]> = tuple;

declare const readonlyArray: DeepReadonly<string[][][][]>;
const badReadonlyArray: DeepReadonly<number[][][][]> = readonlyArray;
const goodReadonlyArray: DeepReadonly<string[][][][]> = readonlyArray;

declare const readonlyTuple: DeepReadonly<[[[[string]]]]>;
const badReadonlyTuple: DeepReadonly<[[[[number]]]]> = readonlyTuple;
const goodReadonlyTuple: DeepReadonly<[[[[string]]]]> = readonlyTuple;

type AssertFalse<T extends false> = T;
type ArrayRelation = AssertFalse<Deep<string[][][][]> extends Deep<number[][][][]> ? true : false>;
type TupleRelation = AssertFalse<Deep<[[[[string]]]]> extends Deep<[[[[number]]]]> ? true : false>;

declare function infer<T>(value: Deep<{ value: T }[][][][]>): T;
declare const nested: Deep<{ value: number }[][][][]>;
const inferred: number = infer(nested);
const badInferred: string = infer(nested);

type Growing<T> = { [K in keyof T]: Growing<T[]> };
declare const growing: Growing<string[]>;
const sameStructure: Growing<number[]> = growing;

type Previous = [never, 0, 1, 2, 3, 4];
type Nest<T, D extends number> = { [K in keyof T]: D extends 0 ? T[K] : Nest<T, Previous[D]> };
declare const boundedArray: Nest<string[], 4>;
const badBoundedArray: Nest<number[], 4> = boundedArray;
const goodBoundedArray: Nest<(string | number)[], 4> = boundedArray;
declare const boundedTuple: Nest<[string], 4>;
const badBoundedTuple: Nest<[number], 4> = boundedTuple;
const goodBoundedTuple: Nest<[string | number], 4> = boundedTuple;
type BoundedRelation = AssertFalse<Nest<[string], 4> extends Nest<[number], 4> ? true : false>;

interface Step<T> { next: T }
type BuildChain<D extends number, T = null> = D extends 0 ? T : BuildChain<Previous[D], Step<T>>;
type ChainNest<T, D> = { [K in keyof T]: D extends Step<infer R> ? ChainNest<T, R> : T[K] };
declare const chain: ChainNest<[string], BuildChain<4>>;
const badChain: ChainNest<[number], BuildChain<4>> = chain;
const goodChain: ChainNest<[string | number], BuildChain<4>> = chain;
type ChainRelation = AssertFalse<ChainNest<[string], BuildChain<4>> extends ChainNest<[number], BuildChain<4>> ? true : false>;

type BuildArray<D extends number, T> = D extends 0 ? T : BuildArray<Previous[D], T[]>;
declare const computedArray: Deep<BuildArray<4, string>>;
const badComputedArray: Deep<BuildArray<4, number>> = computedArray;
const goodComputedArray: Deep<BuildArray<4, string | number>> = computedArray;
type ComputedRelation = AssertFalse<Deep<BuildArray<4, string>> extends Deep<BuildArray<4, number>> ? true : false>;

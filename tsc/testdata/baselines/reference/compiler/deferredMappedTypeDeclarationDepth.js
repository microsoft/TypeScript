//// [tests/cases/compiler/deferredMappedTypeDeclarationDepth.ts] ////

//// [growing.ts]
export function tuple() {
    type C<T> = { [K in keyof T]: C<[T]> };
    return null as unknown as C<[number]>;
}

export function array() {
    type C<T> = { [K in keyof T]: C<T[]> };
    return null as unknown as C<number[]>;
}

export function changingTuple() {
    type C<T, S extends string> = { [K in keyof T]: C<T, `${S}x`> };
    return null as unknown as C<[number], "">;
}

export function changingArray() {
    type C<T, S extends string> = { [K in keyof T]: C<T, `${S}x`> };
    return null as unknown as C<number[], "">;
}

export function nestedContext() {
    type C<T, S> = { [K in keyof T]: C<T, C<S, S>> };
    return null as unknown as C<[number], [number]>;
}

//// [finite.ts]
type Previous = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function array() {
    type P<T> = T extends object ? { [K in keyof T]: P<T[K]> } : T;
    return null as unknown as P<number[][][][][][][][][][][][][]>;
}

export function tuple() {
    type P<T> = T extends object ? { [K in keyof T]: P<T[K]> } : T;
    return null as unknown as P<[[[[[[[[[[[[[number]]]]]]]]]]]]]>;
}

export function composedArray() {
    type P<T> = T extends object ? { [K in keyof T]: P<T[K]> } : T;
    type Q<T> = T extends object ? { [K in keyof T]: Q<T[K]> } : T;
    return null as unknown as P<Q<number[][][][][][][][][][][][][]>>;
}

export function composedTuple() {
    type P<T> = T extends object ? { [K in keyof T]: P<T[K]> } : T;
    type Q<T> = T extends object ? { [K in keyof T]: Q<T[K]> } : T;
    return null as unknown as P<Q<[[[[[[[[[[[[[number]]]]]]]]]]]]]>>;
}

export function boundedArray() {
    type C<T, D extends number> = { [K in keyof T]: D extends 0 ? T[K] : C<T, Previous[D]> };
    return null as unknown as C<number[], 13>;
}

export function boundedTuple() {
    type C<T, D extends number> = { [K in keyof T]: D extends 0 ? T[K] : C<T, Previous[D]> };
    return null as unknown as C<[number], 13>;
}

interface Step<T> { next: T }
type BuildChain<D extends number, T = null> = D extends 0 ? T : BuildChain<Previous[D], Step<T>>;

export function boundedChain() {
    type C<T, D> = { [K in keyof T]: D extends Step<infer R> ? C<T, R> : T[K] };
    return null as unknown as C<[number], BuildChain<13>>;
}


//// [growing.js]
export function tuple() {
    return null;
}
export function array() {
    return null;
}
export function changingTuple() {
    return null;
}
export function changingArray() {
    return null;
}
export function nestedContext() {
    return null;
}
//// [finite.js]
export function array() {
    return null;
}
export function tuple() {
    return null;
}
export function composedArray() {
    return null;
}
export function composedTuple() {
    return null;
}
export function boundedArray() {
    return null;
}
export function boundedTuple() {
    return null;
}
export function boundedChain() {
    return null;
}


//// [growing.d.ts]
export declare function tuple(): any;
export declare function array(): any;
export declare function changingTuple(): any;
export declare function changingArray(): any;
export declare function nestedContext(): any;
//// [finite.d.ts]
type Previous = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export declare function array(): number[][][][][][][][][][][][][];
export declare function tuple(): [[[[[[[[[[[[[number]]]]]]]]]]]]];
export declare function composedArray(): number[][][][][][][][][][][][][];
export declare function composedTuple(): [[[[[[[[[[[[[number]]]]]]]]]]]]];
export declare function boundedArray(): number[][][][][][][][][][][][][][];
export declare function boundedTuple(): [[[[[[[[[[[[[[number]]]]]]]]]]]]]];
interface Step<T> {
    next: T;
}
type BuildChain<D extends number, T = null> = D extends 0 ? T : BuildChain<Previous[D], Step<T>>;
export declare function boundedChain(): [[[[[[[[[[[[[[number]]]]]]]]]]]]]];
export {};

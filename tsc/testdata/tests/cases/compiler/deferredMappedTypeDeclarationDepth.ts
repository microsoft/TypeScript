// @strict: true
// @declaration: true

// @filename: growing.ts
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

// @filename: finite.ts
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

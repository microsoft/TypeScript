// @strict: true

// Repro from #42636

type SubGuard<A, X extends [A]> = X;

type IsSub<M extends any[], S extends any[]> = M extends [...SubGuard<M[number], infer B>, ...S, ...any[]] ? B : never;

type E0 = IsSub<[1, 2, 3, 4], [2, 3, 4]>;  // [1 | 2 | 3 | 4]

type E1 = [1, 2, 3, 4] extends [...infer B, 2, 3, 4, ...any[]] ? B : never;  // unknown[]

// Repro from #42636

type Constrain<T extends C, C> = unknown;

type Foo<A> = A extends Constrain<infer X, A> ? X : never;

type T0 = Foo<string>;  // string

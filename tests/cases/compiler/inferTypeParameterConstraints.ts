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

// https://github.com/microsoft/TypeScript/issues/57286#issuecomment-1927920336

class BaseClass<V> {
  protected fake(): V {
    throw new Error("");
  }
}

class Klass<V> extends BaseClass<V> {
  child = true;
}

type Constructor<V, P extends BaseClass<V>> = new () => P;
type inferTest<V, T> = T extends Constructor<V, infer P> ? P : never;

type U = inferTest<number, Constructor<number, Klass<number>>>;

declare let m: U;
m.child; // ok

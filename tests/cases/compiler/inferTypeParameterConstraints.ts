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

// https://github.com/microsoft/TypeScript/issues/60299

type Data = [a: 1, b: 2, ...c: 3[]];

type TestType1<T extends any[]> = T extends [
  ...infer R extends [any, any],
  ...any[],
]
  ? R
  : never;
type test1 = TestType1<Data>;

type TestType2<T extends any[], Mask extends any[] = [any, any]> = T extends [
  ...infer R extends Mask,
  ...any[],
]
  ? R
  : never;
type test2 = TestType2<Data>;

type ExcludeRest<T extends any[]> = Inner<T>;

type Inner<
  T extends any[],
  Copy extends any[] = T,
  Mask extends any[] = [],
> = Copy extends [any, ...infer Rest]
  ? Inner<T, Rest, [...Mask, any]>
  : Required<Copy> extends [any, ...infer Rest]
  ? Inner<T, Rest, [...Mask, any?]>
  : T extends [...infer Result extends Mask, ...any[]]
  ? Result
  : never;

type test3 = ExcludeRest<[a: 1, b: 2, c?: 3, ...d: 4[]]>;

type Interpolable = string | number | bigint | boolean | null | undefined;

type TestWithInterpolable1<
  T extends string,
  TOutput extends Interpolable = number,
> = T extends `${infer R extends TOutput}` ? R : never;

type ResultWithInterpolable1 = TestWithInterpolable1<`100`>;

type TestWithInterpolable2<
  T extends string,
  TOutput extends Interpolable,
> = T extends `${infer R extends TOutput}` ? R : never;
type ResultWithInterpolable2 = TestWithInterpolable2<`100`, number>;

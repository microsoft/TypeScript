//// [tests/cases/compiler/computedTypesKeyofNoIndexSignatureType.ts] ////

//// [computedTypesKeyofNoIndexSignatureType.ts]
type Compute<A> = { [K in keyof A]: Compute<A[K]>; } & {};

type EqualsTest<T> = <A>() => A extends T ? 1 : 0;
type Equals<A1, A2> = EqualsTest<A2> extends EqualsTest<A1> ? 1 : 0;

type Filter<K, I> = Equals<K, I> extends 1 ? never : K;

type OmitIndex<T, I extends string | number> = {
  [K in keyof T as Filter<K, I>]: T[K];
};

type IndexObject = { [key: string]: unknown; };
type FooBar = { foo: "hello"; bar: "world"; };

type WithIndex = Compute<FooBar & IndexObject>;   // { [x: string]: {}; foo: "hello"; bar: "world"; } <-- OK
type WithoutIndex = OmitIndex<WithIndex, string>; // { foo: "hello"; bar: "world"; }                  <-- OK

type FooBarKey = keyof FooBar;             // "foo" | "bar"   <-- OK
type WithIndexKey = keyof WithIndex;       // string | number <-- Expected: string 
type WithoutIndexKey = keyof WithoutIndex; // number          <-- Expected: "foo" | "bar"

//// [computedTypesKeyofNoIndexSignatureType.js]

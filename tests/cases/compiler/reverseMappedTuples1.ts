// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58726

type Constructor<T> = {
  new (...args: never[]): T;
};

interface GenericParams<T> {
  bar: (t: T) => void;
}

type Pair<T> = [Constructor<T>, GenericParams<T>];

type List<T> = {
  [K in keyof T]: Pair<T[K]>;
};

class Foo {
  test() {}
}
class Bar {
  other() {}
}
class Baz {
  third() {}
}

declare const withFooPair: [Pair<Foo>];
declare const with2FooPairs: [Pair<Foo>, Pair<Foo>];

declare function fn1<T extends readonly {}[]>(params: List<[...T]>): T;

const res1 = fn1([
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }],
]);

const res2 = fn1([
  ...withFooPair,
  [Bar, { bar(t) {} }], // implicit any
]);

const res3 = fn1([
  ...with2FooPairs,
  [Bar, { bar(t) {} }], // implicit any
]);

const res4 = fn1([
  [Bar, { bar(t) {} }],
  ...with2FooPairs,
]);

declare function fn2<T extends readonly {}[]>(params: List<[Foo, Foo, ...T]>): T;

const res5 = fn2([
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
]);

const res6 = fn2([
  ...with2FooPairs,
  [Bar, { bar(t) {} }], // implicit any
]);

const res7 = fn2([
  ...with2FooPairs,
  [Bar, { bar(t) {} }], // implicit any
  [Baz, { bar(t) {} }], // implicit any
]);

declare function fn3<T extends readonly {}[]>(params: List<[...T, Foo, Foo]>): T;

const res8 = fn3([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
]);

const res9 = fn3([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  ...with2FooPairs
]);

const res10 = fn3([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  ...withFooPair,
  [Foo, { bar(t) {} }],
]);

const res11 = fn3([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  ...withFooPair,
]);

declare function fn4<T extends readonly {}[]>(params: List<[Foo, Foo?, ...T]>): T;

const res12 = fn4([
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
]);

const res13 = fn4([
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }], // error
  [Baz, { bar(t) {} }],
]);

declare function fn5<T extends readonly {}[]>(params: List<[...T, Foo?]>): T;

const res14 = fn5([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  [Foo, { bar(t) {} }],
]);

const res15 = fn5([
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }], // error, inferred [Bar, Baz] would satisfy but the checker prefers picking up trailing optional element for contextual typing etc
]);

declare function fn6<T extends readonly {}[]>(params: List<[Foo, Foo, ...T, Foo, Foo]>): T;

const res16 = fn6([
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }],
  [Baz, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
]);

declare function fn7<T extends readonly {}[], T2 extends readonly {}[]>(params: List<[Foo, Foo, ...T, ...T2, Foo]>): [T, T2];

const res17 = fn7([
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }], // implicit any
  [Baz, { bar(t) {} }], // implicit any
  [Foo, { bar(t) {} }], // implicit any
  [Foo, { bar(t) {} }],
]);

declare function fn8<T extends readonly {}[]>(params: List<[Foo, Foo, ...T, ...Foo[]]>): T;

const res18 = fn8([
  [Foo, { bar(t) {} }],
  [Foo, { bar(t) {} }],
  [Bar, { bar(t) {} }], // implicit any
  [Baz, { bar(t) {} }], // implicit any
  [Foo, { bar(t) {} }], // implicit any
  [Foo, { bar(t) {} }], // implicit any
]);

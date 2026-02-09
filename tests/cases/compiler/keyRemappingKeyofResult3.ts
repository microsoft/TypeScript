// @strict: true
// @noEmit: true

type AcceptA<T extends "a"> = T;
type AcceptAB<T extends "a" | "b"> = T;
type AcceptString<T extends string> = T;

type Prefixed1<T> = { [K in keyof T as `pre_${K & string}`]: T[K] };

function test1<T>(k: keyof Prefixed1<T>) {
  const a: `pre_${string}` = k; // ok
  const b: `pre_a` | `pre_a` = k; // error
}

type RemapA<T> = { [K in keyof T as `x_${K & string}`]: T[K] };
type RemapB<T> = { [K in keyof T as `x_${K & string}`]: number };

function test2<T>(ka: keyof RemapA<T>, kb: keyof RemapB<T>) {
  let a: keyof RemapA<T> = kb; // ok
  let b: keyof RemapB<T> = ka; // ok
}

type Prefixed2<K extends string> = { [P in K as `p_${P}`]: any };

function test3<K extends string>(k: keyof Prefixed2<K>) {
  const a: `p_${string}` = k; // ok
  const b: `p_a` | `p_b` = k; // error
}

type Prefixed3<K extends string> = { [P in K as `p_${P}`]: any };

function test4<K extends "a" | "b">(k: keyof Prefixed2<K>) {
  const a: `p_${string}` = k; // ok
  const b: `p_a` | `p_b` = k; // ok
  const c: `p_a` = k; // error
}

type OmitMapped<T, E extends keyof T> = {
  [K in keyof T as Exclude<K, E>]: T[K];
};

function test5<T, E extends keyof T>(k: keyof OmitMapped<T, E>) {
  const x: Exclude<keyof T, E> = k; // ok
}

type Uppercased<T> = { [K in keyof T as Uppercase<K & string>]: T[K] };

function test6<T>(k: keyof Uppercased<T>) {
  const a: Uppercase<string> = k; // ok
}

type Base1 = { a: 1; b: 2 };
type Constrained1<T extends Base1> = {
  [K in keyof T as `c_${K & string}`]: T[K];
};
type Constrained2<T extends Base1> = {
  [K in keyof T as `c_${K & string}`]: boolean;
};

function test7<T extends Base1>(
  k1: keyof Constrained1<T>,
  k2: keyof Constrained2<T>,
) {
  let a: keyof Constrained1<T> = k2; // ok
  let b: keyof Constrained2<T> = k1; // ok
}

function test8<T extends Base1>(k: keyof Constrained1<T>) {
  const a: "c_a" | "c_b" = k; // error
  const b: `c_${string}` = k; // ok
}

type StringPropsOnly<T> = {
  [P in keyof T as T[P] extends string ? P : never]: any;
};

function test9<T>(k: Extract<keyof StringPropsOnly<T>, string>) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

type AllKeysMapped<T> = { [P in keyof T as P]: any };

function test10<T>(k: Extract<keyof AllKeysMapped<T>, string>) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

function test11<T>(k: keyof StringPropsOnly<T>) {
  const s: string = k; // error
  type Result = AcceptString<typeof k>; // error
}

function test12<T>(k: string & keyof StringPropsOnly<T>) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

type FilterByLiteralValue<T, V> = {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

function test13<T extends Base1>(k: keyof FilterByLiteralValue<T, 1>) {
  const s: string = k; // error
  type Result = AcceptString<typeof k>; // error
}

type Base2 = { x: string; y: number };

type FilterByStringValue<T> = {
  [P in keyof T as T[P] extends string ? P : never]: any;
};

function test14<T extends Base2>(k: keyof FilterByStringValue<T>) {
  const s: string = k; // error
  const s2: "x" = k; // error
  type Result1 = AcceptString<typeof k>; // error
  type Result2 = AcceptAB<typeof k>; // error
  type Result3 = AcceptA<typeof k>; // error
}

type RemapC<T> = { [P in keyof T as T[P] extends string ? P : never]: T[P] };
type RemapD<T> = { [P in keyof T as T[P] extends string ? P : never]: number };

function test15<T extends Base2>(ka: keyof RemapC<T>, kb: keyof RemapD<T>) {
  let a: keyof RemapC<T> = kb; // ok
  let b: keyof RemapD<T> = ka; // ok
}

type Base3 = { a: string; b: string; c: string };

type AlwaysNever<T> = { [P in keyof T as 1 extends string ? P : never]: any };

function test16<T extends Base3>(k: keyof AlwaysNever<T>) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

type Base4 = { a: string; b: number };

type PickByType<T, V> = { [P in keyof T as T[P] extends V ? P : never]: T[P] };

function test17<T extends Base4>(k: keyof PickByType<T, string>) {
  const s: string = k; // error
  const s2: typeof k = "a"; // error (checks against a deferred conditional type)
  const s3: "a" = k; // error

  type Result = AcceptString<typeof k>; // error
  type Result2 = AcceptAB<typeof k>; // error
  type Result3 = AcceptA<typeof k>; // error
}

function test18<T extends { a: string; b: number }>(o: {
  [P in keyof T as T[P] extends string ? P : never]: any;
}) {
  type Result = AcceptString<keyof typeof o>; // error
}

type Inner<T> = { [P in keyof T as P extends string ? P : never]: T[P] };
type Outer<T> = {
  [P in keyof Inner<T> as P extends `a${string}` ? P : never]: any;
};

function test19<T extends { apple: 1; apricot: 2; banana: 3 }>(
  k: keyof Outer<T>,
) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

type Prefixed4<T> = {
  [P in keyof T as P extends string ? `mapped_${P}` : never]: any;
};

function test20<T extends { [key: string]: number; specific: 1 }>(
  k: keyof Prefixed4<T>,
) {
  const s: string = k; // ok
  type Result = AcceptString<typeof k>; // ok
}

type Base5 = { a: string; b: number | string };

function test21<T extends Base5>(k: keyof StringPropsOnly<T>) {
  const s: string = k; // error
  const s1: "a" = k; // error
  const s2: "a" | "b" = k; // error
  type Result = AcceptString<typeof k>; // error
  type Result2 = AcceptAB<typeof k>; // error
  type Result3 = AcceptA<typeof k>; // error
}

type ValueIs1<T> = { [P in keyof T as T[P] extends 1 ? P : never]: any };

type Base6 = { [key: string]: number; a: 1 };

function test22<T extends Base6>(k: keyof ValueIs1<T>) {
  const s: string = k; // error
  const s1: "a" = k; // error
  const s2: "a" | "b" = k; // error
  type Result = AcceptString<typeof k>; // error
  type Result2 = AcceptAB<typeof k>; // error
  type Result3 = AcceptA<typeof k>; // error
}

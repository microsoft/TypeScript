// @strict: true
// @noEmit: true

{
  type Inner<A extends any[], A2 extends [...A, boolean]> = A2;
  type Wrapper<A extends any[]> = Inner<
    A,
    [...A, boolean, boolean, boolean, boolean]
  >;
}

{
  type Inner<A extends any[], A2 extends [...A, boolean]> = A2;

  type Wrapper<A extends any[]> = Inner<A, [...A, boolean, boolean, boolean]>;
}

{
  type Inner<A extends any[], A2 extends [...A, boolean]> = A2;

  type Wrapper<A extends any[], B extends any[]> = Inner<
    A,
    [...A, boolean, ...B, boolean, boolean, boolean]
  >;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, boolean, ...B, boolean],
  > = C;

  type Wrapper<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, ...B, boolean, boolean]
  >;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, boolean, ...B, boolean],
  > = C;

  type Wrapper<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, ...B, boolean]
  >;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, boolean, ...B, boolean],
  > = C;

  type Wrapper<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, boolean, ...B, boolean]
  >;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, boolean, boolean, ...B, boolean],
  > = C;

  type Wrapper<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, ...B, boolean]
  >;
}

{
  type Inner<T extends unknown[], U extends [...T, boolean?]> = U;

  type Wrapper1<T extends unknown[]> = Inner<T, [...T]>;
  type Wrapper2<T extends unknown[]> = Inner<T, [...T, boolean]>;
  type Wrapper3<T extends unknown[]> = Inner<T, [...T, boolean?]>;
}

{
  type Inner<T extends unknown[], U extends [boolean, ...T]> = U;

  type Wrapper1<T extends unknown[]> = Inner<T, [...T]>;
  type Wrapper2<T extends unknown[]> = Inner<T, [boolean, ...T]>;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, ...B],
  > = C;

  type Wrapper1<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, ...B]
  >;

  type Wrapper2<A extends unknown[]> = Inner<A, A, [...A]>;

  type Wrapper3<
    A extends unknown[],
    B extends unknown[],
    C extends unknown[],
  > = Inner<A, B, [...A, ...B, ...C]>;

  type Wrapper4<
    A extends unknown[],
    B extends unknown[],
    C extends B,
  > = Inner<A, B, [...A, ...B, ...C]>;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [...A, boolean, ...B],
  > = C;

  type Wrapper1<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, ...B]
  >;

  type Wrapper2<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, ...B]
  >;

  type Wrapper3<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [...A, boolean, boolean, ...B]
  >;
}

{
  type Inner<T extends unknown[], U extends [boolean, ...T, boolean]> = U;

  type Wrapper1<T extends unknown[]> = Inner<T, [boolean, ...T, boolean]>;

  type Wrapper2<T extends unknown[]> = Inner<T, [boolean, ...T]>;

  type Wrapper3<T extends unknown[]> = Inner<T, [...T, boolean]>;

  type Wrapper4<T extends unknown[]> = Inner<
    T,
    [boolean, ...T, boolean, boolean]
  >;
}

{
  type Inner<
    A extends unknown[],
    B extends unknown[],
    C extends [boolean, ...A, string, ...B, number?],
  > = C;

  type Wrapper1<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [boolean, ...A, string, ...B, number?]
  >;

  type Wrapper2<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [boolean, ...A, string, ...B]
  >;

  type Wrapper3<A extends unknown[], B extends unknown[]> = Inner<
    A,
    B,
    [boolean, ...A, ...B, number?]
  >;
}

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
    [...A, boolean, ...B, boolean] // ok
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

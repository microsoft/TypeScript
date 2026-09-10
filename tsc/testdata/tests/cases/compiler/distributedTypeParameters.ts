// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63708

type Show<A, B extends A> = [A, B] & {};

type Issue1<A, B extends A> =
  A extends unknown ?
    B extends unknown ?
        Show<A, B> :  // Error
        never :
    never;

type Issue2<A, B extends A> =
  B extends unknown ?
    A extends unknown ?
        Show<A, B> :  // Error
        never :
    never;

type Issue3<A, B> =
  A extends B ?
    B extends A ?
        Show<A, B> :
        never :
    never;

type Issue4<A, B> =
  B extends A ?
    A extends B ?
        Show<A, B> :  // Error
        never :
    never;

type X1 = Issue1<0 | 1, 0 | 1>;
type X2 = Issue2<0 | 1, 0 | 1>;
type X3 = Issue3<0 | 1, 0 | 1>;
type X4 = Issue4<0 | 1, 0 | 1>;

type T1<A extends number, B extends A> =
  A extends B ?
    never :
    Show<A, B>;  // Error

type T2<A extends number, B extends A> =
  A extends B ?
    Show<A, B> :  // Error
    never;

type T3<A, B extends A, C extends B> =
  A extends unknown ?
    Show<A, C> :  // Error
    Show<B, C>;

type T4<A, B extends A, C extends B> =
  A extends unknown ?
    B extends unknown ?
      Show<A, C> :  // Error
      Show<B, C> :  // Error
    never;

type T5<A extends number, B extends A> =
  [A] extends [B] ?
    Show<A, B> :
    never;

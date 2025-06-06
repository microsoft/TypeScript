// @strict: true
// @noEmit: true

declare const EffectTypeId: unique symbol;

interface Variance<out A, out E, out R> {
  readonly [EffectTypeId]: VarianceStruct<A, E, R>;
}

type Covariant<A> = (_: never) => A;

interface VarianceStruct<out A, out E, out R> {
  readonly _V: string;
  readonly _A: Covariant<A>;
  readonly _E: Covariant<E>;
  readonly _R: Covariant<R>;
}

interface Effect<out A, out E = never, out R = never>
  extends Variance<A, E, R> {}

declare const succeed: <A>(value: A) => Effect<A>;

type F<X, Y> = Y extends { _type: infer Z }
  ? X extends Effect<infer A, infer E, infer R>
    ? Effect<A, E, R | Z>
    : X
  : X;

type ProxyMap<Service> = {
  [K in keyof Service]: (Service & { _type: Service })[K];
};

declare const implement: <T>() => <I extends ReadonlyArray<any>, X>(
  x: (...i: I) => X,
) => (...i: I) => F<X, T>;

class XXX {
  log = implement<this>()(<N extends number>(n: N) => succeed(n));
}

export declare const inner: XXX;
export declare const outer: ProxyMap<XXX>;

export const a = inner.log(100); // Effect<100, never, never>
export const b = outer.log(100); // Effect<100, never, XXX>

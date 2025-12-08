// @strict: true
// @target: esnext
// @noEmit: true

type Covariant<A> = (_: never) => A;

interface Effect<out A, out E = never, out R = never> {
  readonly _A: Covariant<A>;
  readonly _E: Covariant<E>;
  readonly _R: Covariant<R>;
}

declare function effectGen<A, E, R, AEff>(
  f: () => Generator<Effect<A, E, R>, AEff, never>,
): Effect<AEff, E, R>;

declare function effectFn<A, E, R, AEff, Args extends Array<any>>(
  body: (...args: Args) => Generator<Effect<A, E, R>, AEff, never>,
): (...args: Args) => Effect<AEff, E, R>;

interface Tag<in out Id, in out Value> {
  readonly _op: "Tag";
  readonly Service: Value;
  readonly Identifier: Id;
}

interface TagClassShape<Id, Shape> {
  readonly Type: Shape;
  readonly Id: Id;
}

interface TagClass<Self, Id extends string, Type> extends Tag<Self, Type> {
  new (_: never): TagClassShape<Id, Type>;
  readonly key: Id;
}

declare function layerEffect<I, S, E, R>(
  tag: Tag<I, S>,
  effect: Effect<S, E, R>,
): unknown;

declare function Tag<const Id extends string>(
  id: Id,
): <Self, Shape>() => TagClass<Self, Id, Shape>;

class Foo extends Tag("Foo")<
  Foo,
  {
    fn: (a: string) => Effect<void>;
  }
>() {}

layerEffect(
  Foo,
  effectGen(function* () {
    return {
      fn: effectFn(function* (a) {
        a; // string
      }),
    };
  }),
);

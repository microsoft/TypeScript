// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

type ReadonlyRecord<in out K extends string | symbol, out A> = {
  readonly [P in K]: A;
};

type Success<T> = T extends Micro<infer _A, infer _E, infer _R> ? _A : never;

interface MicroIterator<T extends Micro<any, any, any>> {
  next(...args: ReadonlyArray<any>): IteratorResult<T, Success<T>>;
}

interface Micro<out A, out E = never, out R = never> {
  _A: A;
  _E: E;
  _R: R;
  [Symbol.iterator](): MicroIterator<Micro<A, E, R>>;
}

declare function runPromise<A, E>(effect: Micro<A, E>): Promise<A>;

declare function gen<Eff extends Micro<any, any, any>, AEff>(
  body: () => Generator<Eff, AEff, never>,
): Micro<AEff, any, never>;

declare const traverse: {
  <A, R, O, E, B>(
    f: (a: A) => Micro<B, E, O>,
  ): (
    self: ReadonlyRecord<string, A>,
  ) => Micro<ReadonlyRecord<string, B>, E, O>;
  <A, O, E, B>(
    self: ReadonlyRecord<string, A>,
    f: (a: A) => Micro<B, E, O>,
  ): Micro<ReadonlyRecord<string, B>, E, O>;
};

runPromise(
  gen(function* () {
    yield* traverse({ a: 1, b: 2 }, (n) =>
      gen(function* () {
        return n + 1;
      }),
    );
  }),
);

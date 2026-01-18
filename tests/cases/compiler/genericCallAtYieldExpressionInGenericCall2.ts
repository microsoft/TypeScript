// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

interface Effect {
  [Symbol.iterator](): {
    next(...args: ReadonlyArray<any>): IteratorResult<any, any>;
  };
}

interface Enqueue<A> {
  offer: (value: A) => Effect;
}

declare const offer: {
  <A>(value: A): (self: Enqueue<A>) => Effect;
  <A>(self: Enqueue<A>, value: A): Effect;
};

declare function fn<Eff extends Effect, AEff, Args extends Array<any>>(
  body: (...args: Args) => Generator<Eff, AEff, any>,
): (...args: Args) => any;

fn(function* <T>(queue: Enqueue<T>, value: T) {
  yield* offer(queue, value);
});

fn(function* <T>(queue: Enqueue<T>, value: T) {
  const x = offer(queue, value);
  yield* x;
});

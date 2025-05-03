// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true

declare const inner: {
  <A>(value: A): {
    (): A;
    [Symbol.iterator](): {
      next(...args: ReadonlyArray<any>): IteratorResult<any, A>;
    };
  };
};

declare function outer<A>(body: (value: A) => Generator<any, any, any>): void;

outer(function* <T>(value: T) {
  const result = yield* inner(value); // ok
});

outer(function* <T>(value: T) {
  const x = inner(value);
  const result = yield* x; // ok
});

declare const inner2: {
  <A>(value: A): () => A;
};

outer(function* <T>(value: T) {
  const result = yield* inner2(value); // error
});

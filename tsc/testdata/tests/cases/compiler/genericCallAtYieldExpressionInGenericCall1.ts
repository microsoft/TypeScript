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

declare const inner3: {
  <A>(value: A): {
    (): A;
    [Symbol.iterator](): {
      next(...args: ReadonlyArray<any>): IteratorResult<number, A>;
    };
  };
};

declare function outer2<A, Y>(body: (value: A) => Generator<Y, any, any>): Y;

// number
const result1 = outer2(function* <T>(value: T) {
  yield* inner3(value);
});

// number
const result2 = outer2(function* <T>(value: T) {
  const x = inner3(value);
  yield* x;
});

declare function outer3<A>(
  body: (value: A) => Generator<never, unknown, unknown>,
): void;

// error
outer3(function* <T>(value: T) {
  yield* inner3(value);
});

// error
outer3(function* <T>(value: T) {
  const x = inner3(value);
  yield* x;
});

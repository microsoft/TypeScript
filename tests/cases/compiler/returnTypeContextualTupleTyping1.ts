// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62071

declare function getNum(): Promise<number>;
declare function getStr(): Promise<string>;
declare function useTuple(tuple: [number, string]): void;

const p = Promise.resolve([])
  .then(() => Promise.all([getNum(), getStr()]))
  .then(useTuple); // ok

// same as above but without relying as much on builtin libs
interface MyPromise<T> {
  then<
    TResult1 = T, // outer type parameter used as default here is important for the test
    TResult2 = never,
  >(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): MyPromise<TResult1 | TResult2>;
}

declare function resolve<T>(value: T): MyPromise<Awaited<T>>;
declare function resolve<T>(value: T | PromiseLike<T>): MyPromise<Awaited<T>>;

declare function all<T extends readonly unknown[] | []>(
  values: T,
): MyPromise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

const p2 = resolve([])
  .then(() => all([getNum(), getStr()]))
  .then(useTuple); // ok

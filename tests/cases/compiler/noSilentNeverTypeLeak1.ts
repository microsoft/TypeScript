// @strict: true
// @noEmit: true

type Fn<T> = (arg: T) => void;

declare function fn1<T>(): Fn<T>;

declare function fn2<T>(
  cb: Fn<{
    [K in keyof T & string]: T[K];
  }>,
): void;

fn2(fn1());

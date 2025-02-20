// @strict: true
// @noEmit: true

declare const test1:
  | ((...args: [a: string | number, b: number | boolean]) => void)
  | ((...args: [c: number | boolean, d: string | boolean]) => void);

test1(42, true);
test1(42, [true]); // error

declare function test2<
  A extends readonly unknown[],
  B extends readonly unknown[],
>(
  c: (...args: A) => void,
  d: (...args: B) => void,
  e: (arg: typeof c | typeof d) => void,
): void;

test2(
  (a: number | boolean, b: string | number) => {},
  (c: string | boolean, d: number | boolean) => {},
  (cb) => {
    cb(true, 42);
    cb(true, [42]); // error
  },
);

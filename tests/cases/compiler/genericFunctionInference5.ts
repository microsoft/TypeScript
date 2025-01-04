// @strict: true
// @noEmit: true

declare function inner<T>(kind: T): T;

declare function outer<A extends string | number, T>(
  callback: (num: number) => (arg: A) => T,
): (arg: A) => T;

export const result = outer(
  (num) =>
    <T extends number>(arg: T) =>
      inner(arg),
);
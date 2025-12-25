// @strict: true
// @noEmit: true

declare function inner<T>(kind: T): T;

declare function outer<A extends string | number, T>(
  callback: (arg: A) => (num: number) => T,
): (arg: A) => T;

export const result = outer(
  <T extends number>(arg: T) =>
    (num) =>
      inner(arg),
);
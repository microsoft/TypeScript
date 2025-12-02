// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60552

declare function fooooooo<
  T,
  Result extends ArrayLike<unknown>,
  Extra extends readonly unknown[],
>(
  input: T,
  callback: (input: T, prev: Result, ...extra: Extra) => Result,
  extra: Extra,
): Result;

declare function baaaaaar<T, Result extends ArrayLike<unknown>>(
  input: T,
  callback: (input: T, prev: Result) => Result,
): Result;

declare function callback<T>(input: T, prev: string[]): string[];

export function example<T>(input: T) {
  const result1 = fooooooo(input, callback, []); // ok
  const result2 = baaaaaar(input, callback); // ok
}

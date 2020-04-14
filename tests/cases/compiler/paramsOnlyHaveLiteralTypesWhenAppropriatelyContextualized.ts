// @strict: true
// Using a homomorphic mapped type over `T`
// Produces a lower-priority inference for `T` than other
// positions, allowing one to override the priority the argument
// order would usually imply
type Lower<T> = { [K in keyof T]: T[K] };

export function appendToOptionalArray<
  K extends string | number | symbol,
  T
>(
  object: { [x in K]?: Lower<T>[] },
  key: K,
  value: T
) {
  const array = object[key];
  if (array) {
    array.push(value);
  } else {
    object[key] = [value];
  }
}

// e.g.
const foo: {x?: number[]; y?: string[]; } = {};
appendToOptionalArray(foo, 'x', 123);   // ok
appendToOptionalArray(foo, 'y', 'bar'); // ok
appendToOptionalArray(foo, 'y', 12);    // should fail
appendToOptionalArray(foo, 'x', "no");  // should fail
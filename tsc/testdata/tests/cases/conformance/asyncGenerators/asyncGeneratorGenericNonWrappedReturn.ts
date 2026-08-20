// @target: esnext
// @strict: true
// @noEmit: true

// #48966

export async function* test<T>(a: T): AsyncGenerator<T, T, T> {
  return a // `T` should be allowed here even though the generator's `returnType` is `Awaited<T>`
}

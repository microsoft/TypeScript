declare const f:
  <T extends F<T>>(t: T) => T

type F<T> =
  { a: unknown
  , b: (a: T["a" & keyof T]) => unknown
  }

f({
  a: "hello",
  b: x => x.toUpperCase()
})

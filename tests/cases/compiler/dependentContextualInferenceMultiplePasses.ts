declare const f:
  <T extends F<T>>(t: T) => T

type F<T> =
  { a: unknown
  , b: (a: T["a" & keyof T]) => unknown
  , c: (b: ReturnType<Extract<T["b" & keyof T], (...a: never[]) => unknown>>) => unknown
  }

f({
  a: ({ value: "a" as "a" }),
  b: x => ({ value: x.value  }),
  c: x => ({ value: x.value  })
})

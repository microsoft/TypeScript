declare const f:
  <T extends { a: unknown, b: (a: T["a"]) => unknown }>(t: T) => void

f({
  a: "hello",
  b: x => x.toUpperCase()
})

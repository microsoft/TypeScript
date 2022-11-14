declare const m: <T extends M<T>>(m: T) => T
type M<Self> =
  { a?: number
  , b?: number
  , c?: number
  , d?: number
  , k?: Exclude<keyof Self, "k" | "t">
  , t?: (k: Exclude<keyof Self, "k" | "t">) => void
  }

m({
  a: 1,
  b: 2,
  k: "a", 
  t: k => {}
})

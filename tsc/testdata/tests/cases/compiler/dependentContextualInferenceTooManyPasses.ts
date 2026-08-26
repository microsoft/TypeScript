declare const f:
  <T extends
    { a: unknown
    , b: (a: T["a"]) => unknown
    , c: (b: ReturnType<T["b"]>) => unknown
    , d: (c: ReturnType<T["c"]>) => unknown
    , e: (d: ReturnType<T["d"]>) => unknown
    , f: (d: ReturnType<T["e"]>) => unknown
    , g: (d: ReturnType<T["f"]>) => unknown
    }
  >(t: T) => void

f({
  a: ({ value: "a" as "a" }),
  b: x => ({ value: x.value  }),
  c: x => ({ value: x.value  }),
  d: x => ({ value: x.value  }),
  e: x => ({ value: x.value  }),
  f: x => ({ value: x.value  }),
  g: x => ({ value: x.value  }),
})

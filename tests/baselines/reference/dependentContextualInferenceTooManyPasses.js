//// [dependentContextualInferenceTooManyPasses.ts]
declare const f:
  <T extends F<T>>(t: T) => T

type F<T> =
  { a: unknown
  , b: (a: T["a" & keyof T]) => unknown
  , c: (b: ReturnType<Extract<T["b" & keyof T], (...a: never[]) => unknown>>) => unknown
  , d: (c: ReturnType<Extract<T["c" & keyof T], (...a: never[]) => unknown>>) => unknown
  , e: (d: ReturnType<Extract<T["d" & keyof T], (...a: never[]) => unknown>>) => unknown
  }

f({
  a: ({ value: "a" as "a" }),
  b: x => ({ value: x.value  }),
  c: x => ({ value: x.value  }),
  d: x => ({ value: x.value  }),
  e: x => ({ value: x.value  }),
})


//// [dependentContextualInferenceTooManyPasses.js]
f({
    a: ({ value: "a" }),
    b: function (x) { return ({ value: x.value }); },
    c: function (x) { return ({ value: x.value }); },
    d: function (x) { return ({ value: x.value }); },
    e: function (x) { return ({ value: x.value }); }
});

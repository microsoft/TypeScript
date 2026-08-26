//// [tests/cases/compiler/dependentContextualInferenceMultiplePasses.ts] ////

//// [dependentContextualInferenceMultiplePasses.ts]
declare const f:
  <T extends
    { a: unknown
    , b: (a: T["a"]) => unknown
    , c: (b: ReturnType<T["b"]>) => unknown
    }
  >
    (t: T) => void

f({
  a: ({ value: "a" as "a" }),
  b: x => ({ value: x.value  }),
  c: x => ({ value: x.value  })
})


//// [dependentContextualInferenceMultiplePasses.js]
"use strict";
f({
    a: ({ value: "a" }),
    b: x => ({ value: x.value }),
    c: x => ({ value: x.value })
});

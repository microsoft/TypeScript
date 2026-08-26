//// [tests/cases/compiler/dependentContextualInferenceBasic.ts] ////

//// [dependentContextualInferenceBasic.ts]
declare const f:
  <T extends { a: unknown, b: (a: T["a"]) => unknown }>(t: T) => void

f({
  a: "hello",
  b: x => x.toUpperCase()
})


//// [dependentContextualInferenceBasic.js]
"use strict";
f({
    a: "hello",
    b: x => x.toUpperCase()
});

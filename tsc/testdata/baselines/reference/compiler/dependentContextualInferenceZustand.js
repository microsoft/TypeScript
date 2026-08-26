//// [tests/cases/compiler/dependentContextualInferenceZustand.ts] ////

//// [dependentContextualInferenceZustand.ts]
declare const create:
  <T extends
    { run:
        ( set: Store<ReturnType<T["run"]>>["set"]
        , get: Store<ReturnType<T["run"]>>["get"]
        ) => unknown
    }
  >
    (t: T) =>
      Store<ReturnType<T["run"]>>
  
interface Store<T>
  { get: () => T
  , set: (value: Partial<T>) => void
  }

const store = create({
  run: (set, get) => ({
    count: 0,
    increment: () => set({ count: get().count + 1 })
  })
})
const _check: Store<{ count: number, increment: () => void }> = store

//// [dependentContextualInferenceZustand.js]
"use strict";
const store = create({
    run: (set, get) => ({
        count: 0,
        increment: () => set({ count: get().count + 1 })
    })
});
const _check = store;

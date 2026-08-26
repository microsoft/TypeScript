//// [tests/cases/compiler/dependentContextualInferenceZustand.ts] ////

//// [dependentContextualInferenceZustand.ts]
declare const create:
  <T extends
    ( set: Store<ReturnType<T>>["set"]
    , get: Store<ReturnType<T>>["get"]
    ) => unknown
  >
    (t: T) =>
      Store<ReturnType<T>>
  
interface Store<T>
  { get: () => T
  , set: (value: Partial<T>) => void
  }

const store = create((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 })
}))
const _check: Store<{ count: number, increment: () => void }> = store

//// [dependentContextualInferenceZustand.js]
"use strict";
const store = create((set, get) => ({
    count: 0,
    increment: () => set({ count: get().count + 1 })
}));
const _check = store;

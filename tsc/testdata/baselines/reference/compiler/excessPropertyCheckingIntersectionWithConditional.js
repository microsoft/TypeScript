//// [tests/cases/compiler/excessPropertyCheckingIntersectionWithConditional.ts] ////

//// [excessPropertyCheckingIntersectionWithConditional.ts]
type Foo<K> = K extends unknown ? { a: number } : unknown
const createDefaultExample = <K,>(x: K): Foo<K> & { x: K; } => {
  return { a: 1, x: x }; // Error: Foo<never> is never.
}

//// [excessPropertyCheckingIntersectionWithConditional.js]
"use strict";
const createDefaultExample = (x) => {
    return { a: 1, x: x }; // Error: Foo<never> is never.
};

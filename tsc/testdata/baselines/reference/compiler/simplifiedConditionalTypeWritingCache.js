//// [tests/cases/compiler/simplifiedConditionalTypeWritingCache.ts] ////

//// [simplifiedConditionalTypeWritingCache.ts]
type Value<T extends { a: string; b: number }> = T["a" | "b"] extends unknown
  ? T["a" | "b"]
  : never;

function test<T extends { a: string; b: number }>(value: Value<T>, a: T["a"]) {
  const read: T["a"] | T["b"] = value;
  const write: Value<T> = a;
}


//// [simplifiedConditionalTypeWritingCache.js]
"use strict";
function test(value, a) {
    const read = value;
    const write = a;
}

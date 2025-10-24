//// [tests/cases/compiler/intersectionPropertyCheck.ts] ////

//// [intersectionPropertyCheck.ts]
let obj: { a: { x: string } } & { c: number } = { a: { x: 'hello', y: 2 }, c: 5 };  // Nested excess property

declare let wrong: { a: { y: string } };
let weak: { a?: { x?: number } } & { c?: string } = wrong;  // Nested weak object type

function foo<T extends object>(x: { a?: string }, y: T & { a: boolean }) {
  x = y;  // Mismatched property in source intersection
}

// Repro from #36637

interface Test {
  readonly hi?: string[]
}

function test<T extends object>(value: T): Test {
  return { ...value, hi: true }
}


//// [intersectionPropertyCheck.js]
"use strict";
let obj = { a: { x: 'hello', y: 2 }, c: 5 }; // Nested excess property
let weak = wrong; // Nested weak object type
function foo(x, y) {
    x = y; // Mismatched property in source intersection
}
function test(value) {
    return Object.assign(Object.assign({}, value), { hi: true });
}

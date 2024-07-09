// @strict: true

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

// @strict: true
// @noEmit: true

type Foo = { type: "foo"; foo: number };
type Bar = { type: "bar"; bar: string };

declare function skipIf<A, B extends A>(
  as: A[],
  predicate: (a: A) => a is B,
): Exclude<A, B>[];

declare const items: (Foo | Bar)[];

const r1 = skipIf(items, (item) => item.type === "foo"); // ok
const r2 = skipIf(items, (item) => item.type === "foo" || item.type === "bar"); // ok
const r3 = skipIf(items, (item) => false); // error
const r4 = skipIf(items, (item) => true); // error

const pred1: (a: string | null, b: string | null) => b is string = (a, b) => typeof b === 'string'; // ok
const pred2: (a: string | null, b: string | null) => b is string = (a, b) => typeof a === 'string'; // error

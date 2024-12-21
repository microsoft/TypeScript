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
const r3 = skipIf(items, (item) => false); // ok
const r4 = skipIf(items, (item) => true); // ok

const pred1: (a: string | null, b: string | null) => b is string = (a, b) => typeof b === 'string'; // ok
const pred2: (a: string | null, b: string | null) => b is string = (a, b) => typeof a === 'string'; // error

export declare function every<T, U extends T>(array: readonly T[], callback: (element: T, index: number) => element is U): array is readonly U[];
export declare function every<T, U extends T>(array: readonly T[] | undefined, callback: (element: T, index: number) => element is U): array is readonly U[] | undefined;
export declare function every<T>(array: readonly T[] | undefined, callback: (element: T, index: number) => boolean): boolean;

type Type = {
  kind: number;
  flags: number;
};

function testEvery(typeSet: Type[]) {
  if (every(typeSet, (t) => t.kind === 1)) {
    return 1;
  }
  if (every(typeSet, (t) => t.kind === 2)) {
    return 2;
  }
  return -1;
}

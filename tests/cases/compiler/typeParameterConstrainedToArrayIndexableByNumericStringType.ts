// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56823

declare function test1<A extends unknown[]>(arr: A): A[`${number}`];
const res1 = test1([1, 2, 3]);

declare function test2<A extends [unknown, unknown]>(arr: A): A[`${number}`];
const res2 = test2([1, 'foo']);

declare function test3<A extends [unknown, unknown, ...unknown[]]>(arr: A): A[`${number}`];
const res3 = test3([1, 'foo', true]);
declare const tuple1: [number, string, ...boolean[]];
const res4 = test3(tuple1);

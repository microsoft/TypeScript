// @strict: true
// @target: es2015
// @noEmit: true

// Inferring from string[][] to Iterable<Iterable<T>> recurses through the
// [Symbol.iterator] methods of both arrays. Whether that looks like expanding
// recursion must not depend on whether string[] was iterated beforehand.

// @filename: first.ts
declare function flatten1<T>(iterable: Iterable<Iterable<T>>): T[];
declare const lists1: string[][];
const flat1: null = flatten1(lists1);

declare const items1: string[];
for (const item of items1) {}

// @filename: second.ts
declare const items2: number[];
for (const item of items2) {}

declare function flatten2<T>(iterable: Iterable<Iterable<T>>): T[];
declare const lists2: number[][];
const flat2: null = flatten2(lists2);

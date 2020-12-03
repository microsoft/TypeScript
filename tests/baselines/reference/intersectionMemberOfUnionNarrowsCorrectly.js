//// [intersectionMemberOfUnionNarrowsCorrectly.ts]
export type U = { kind?: 'A', a: string } | { kind?: 'B' } & { b: string };
type Ex<T, U> = T extends U ? T : never;
declare let x: Ex<U, { kind?: 'A' }>
x.a


//// [intersectionMemberOfUnionNarrowsCorrectly.js]
"use strict";
exports.__esModule = true;
x.a;

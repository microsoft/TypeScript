//// [tests/cases/conformance/types/intersection/intersectionMemberOfUnionNarrowsCorrectly.ts] ////

//// [intersectionMemberOfUnionNarrowsCorrectly.ts]
export type U = { kind?: 'A', a: string } | { kind?: 'B' } & { b: string };
type Ex<T, U> = T extends U ? T : never;
declare let x: Ex<U, { kind?: 'A' }>
x.a


//// [intersectionMemberOfUnionNarrowsCorrectly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
x.a;

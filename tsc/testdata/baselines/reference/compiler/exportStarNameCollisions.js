//// [tests/cases/compiler/exportStarNameCollisions.ts] ////

//// [a.ts]
export const onlyA = 1;
export const shared = "a";
export interface SharedType { fromA: true }
export default "a";

//// [b.ts]
export const onlyB = 2;
export const shared = "b";
export interface SharedType { fromB: true }
export default "b";

//// [b2.ts]
export const shared = "b2";

//// [sameSymbol.ts]
export { shared } from "./a";

//// [twoStarsCollide.ts]
// 'shared' and 'SharedType' come from both modules with different meanings.
export * from "./a";
export * from "./b";

//// [threeStarsCollide.ts]
// Both later declarations are reported against the first one.
export * from "./a";
export * from "./b";
export * from "./b2";

//// [sameSymbolTwice.ts]
// Reaching the same symbol through two declarations is not a collision.
export * from "./a";
export * from "./sameSymbol";

//// [localShadows.ts]
// A module's own export takes precedence and silences the collision for shared, but not for SharedType.
export * from "./a";
export * from "./b";
export const shared = "local";

//// [singleStar.ts]
export * from "./a";

//// [typeOnlyThenValue.ts]
export type * from "./a";
export * from "./b";

//// [valueThenTypeOnly.ts]
export * from "./a";
export type * from "./b";

//// [chained.ts]
export * from "./twoStarsCollide";
export * from "./singleStar";

//// [consumer.ts]
import { onlyA, onlyB, shared as s1 } from "./twoStarsCollide";
import { shared as s2 } from "./sameSymbolTwice";
import { shared as s3 } from "./localShadows";
import { shared as s4, onlyA as a4 } from "./singleStar";
import { onlyA as a5, onlyB as b5 } from "./typeOnlyThenValue";
import { onlyA as a6, onlyB as b6 } from "./valueThenTypeOnly";
import { onlyA as a7, onlyB as b7, shared as s7 } from "./chained";
import type { SharedType } from "./twoStarsCollide";
export const values = [onlyA, onlyB, s1, s2, s3, s4, a4, a5, b5, a6, b6, a7, b7, s7];
export let t: SharedType | undefined;


//// [a.js]
export const onlyA = 1;
export const shared = "a";
export default "a";
//// [b.js]
export const onlyB = 2;
export const shared = "b";
export default "b";
//// [b2.js]
export const shared = "b2";
//// [sameSymbol.js]
export { shared } from "./a";
//// [twoStarsCollide.js]
// 'shared' and 'SharedType' come from both modules with different meanings.
export * from "./a";
export * from "./b";
//// [threeStarsCollide.js]
// Both later declarations are reported against the first one.
export * from "./a";
export * from "./b";
export * from "./b2";
//// [sameSymbolTwice.js]
// Reaching the same symbol through two declarations is not a collision.
export * from "./a";
export * from "./sameSymbol";
//// [localShadows.js]
// A module's own export takes precedence and silences the collision for shared, but not for SharedType.
export * from "./a";
export * from "./b";
export const shared = "local";
//// [singleStar.js]
export * from "./a";
//// [typeOnlyThenValue.js]
export * from "./b";
//// [valueThenTypeOnly.js]
export * from "./a";
//// [chained.js]
export * from "./twoStarsCollide";
export * from "./singleStar";
//// [consumer.js]
import { onlyA, onlyB, shared as s1 } from "./twoStarsCollide";
import { shared as s2 } from "./sameSymbolTwice";
import { shared as s3 } from "./localShadows";
import { shared as s4, onlyA as a4 } from "./singleStar";
import { onlyB as b5 } from "./typeOnlyThenValue";
import { onlyA as a6 } from "./valueThenTypeOnly";
import { onlyA as a7, onlyB as b7, shared as s7 } from "./chained";
export const values = [onlyA, onlyB, s1, s2, s3, s4, a4, a5, b5, a6, b6, a7, b7, s7];
export let t;


//// [a.d.ts]
export declare const onlyA = 1;
export declare const shared = "a";
export interface SharedType {
    fromA: true;
}
declare const _default = "a";
export default _default;
//// [b.d.ts]
export declare const onlyB = 2;
export declare const shared = "b";
export interface SharedType {
    fromB: true;
}
declare const _default = "b";
export default _default;
//// [b2.d.ts]
export declare const shared = "b2";
//// [sameSymbol.d.ts]
export { shared } from "./a";
//// [twoStarsCollide.d.ts]
export * from "./a";
export * from "./b";
//// [threeStarsCollide.d.ts]
export * from "./a";
export * from "./b";
export * from "./b2";
//// [sameSymbolTwice.d.ts]
export * from "./a";
export * from "./sameSymbol";
//// [localShadows.d.ts]
export * from "./a";
export * from "./b";
export declare const shared = "local";
//// [singleStar.d.ts]
export * from "./a";
//// [typeOnlyThenValue.d.ts]
export type * from "./a";
export * from "./b";
//// [valueThenTypeOnly.d.ts]
export * from "./a";
export type * from "./b";
//// [chained.d.ts]
export * from "./twoStarsCollide";
export * from "./singleStar";
//// [consumer.d.ts]
import type { SharedType } from "./twoStarsCollide";
export declare const values: (string | number)[];
export declare let t: SharedType | undefined;

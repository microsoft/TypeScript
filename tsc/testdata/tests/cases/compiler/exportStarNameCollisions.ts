// @module: esnext
// @target: es2015
// @declaration: true

// @filename: a.ts
export const onlyA = 1;
export const shared = "a";
export interface SharedType { fromA: true }
export default "a";

// @filename: b.ts
export const onlyB = 2;
export const shared = "b";
export interface SharedType { fromB: true }
export default "b";

// @filename: b2.ts
export const shared = "b2";

// @filename: sameSymbol.ts
export { shared } from "./a";

// @filename: twoStarsCollide.ts
// 'shared' and 'SharedType' come from both modules with different meanings.
export * from "./a";
export * from "./b";

// @filename: threeStarsCollide.ts
// Both later declarations are reported against the first one.
export * from "./a";
export * from "./b";
export * from "./b2";

// @filename: sameSymbolTwice.ts
// Reaching the same symbol through two declarations is not a collision.
export * from "./a";
export * from "./sameSymbol";

// @filename: localShadows.ts
// A module's own export takes precedence and silences the collision for shared, but not for SharedType.
export * from "./a";
export * from "./b";
export const shared = "local";

// @filename: singleStar.ts
export * from "./a";

// @filename: typeOnlyThenValue.ts
export type * from "./a";
export * from "./b";

// @filename: valueThenTypeOnly.ts
export * from "./a";
export type * from "./b";

// @filename: chained.ts
export * from "./twoStarsCollide";
export * from "./singleStar";

// @filename: consumer.ts
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

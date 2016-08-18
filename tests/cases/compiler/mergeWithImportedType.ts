// @module:commonjs
// @filename: f1.ts
export enum E {X}

// @filename: f2.ts
import {E} from "./f1";
// partial revert of https://github.com/Microsoft/TypeScript/pull/7583 to prevent breaking changes
export type E = E;
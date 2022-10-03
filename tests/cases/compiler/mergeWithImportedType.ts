// @module:commonjs
// @filename: f1.ts
export enum E {X}

// @filename: f2.ts
import {E} from "./f1";
export type E = E;
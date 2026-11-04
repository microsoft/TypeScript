// @module: commonjs
// @target: es2015
// @declaration: true

// A module augmentation can merge a named declaration into a default export, so the
// default export's key in the module's exports is not the name of its symbol.

// @Filename: /a.ts
interface I {}
export default I;
export interface J {}

// @Filename: /b.ts
export {};
declare module './a' {
    export default interface I { x: number; }
}

// @Filename: /c.ts
export * from "./a";

// @Filename: /d.ts
import { I, J } from "./c";
export const i: I = { x: 0 };
export const j: J = {};

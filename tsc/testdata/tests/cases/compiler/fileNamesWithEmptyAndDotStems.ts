// @target: esnext
// @module: nodenext
// @moduleResolution: nodenext
// @declaration: true
// @rootDir: /src
// @outDir: /dist
// @strict: true

// @filename: /src/empty/.ts
export const empty = 1;

// @filename: /src/dot/..ts
export const dot = 2;

// @filename: /src/parent/...ts
export const parent = 3;

// @filename: /src/decl/.d.ts
export declare const declared: number;

// @filename: /src/main.ts
import { declared } from "./decl/.js";
export { empty } from "./empty/.js";
export { dot } from "./dot/..js";
export { parent } from "./parent/...js";
export const fromDeclaration = declared;

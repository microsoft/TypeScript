// @noImplicitReferences: true
// @traceResolution: true
// @typeRoots: types

// @filename: /node_modules/@cow/boy/index.d.ts
export const x: number;

// @filename: /node_modules/@types/be__bop/index.d.ts
export const y: number;

// @filename: /node_modules/@types/be__bop/e/z.d.ts
export const z: number;

// @filename: /a.ts
import { x } from "@cow/boy";
import { y } from "@be/bop";
import { z } from "@be/bop/e/z";

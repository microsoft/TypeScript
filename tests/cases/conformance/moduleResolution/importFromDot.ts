// @module: commonjs

// @Filename: a.ts
export const rootA = 0;

// @Filename: a/index.ts
export const indexInA = 0;

// @Filename: a/b.ts
import { indexInA, rootA } from ".";

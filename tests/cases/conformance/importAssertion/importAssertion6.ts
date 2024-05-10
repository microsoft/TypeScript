// @module: esnext
// @target: esnext
// @disallowAssertKeywords: true,false

// @filename: a.ts
export const a = 1;
export const b = 2;

// @filename: b.ts
import './a' assert { type: "json" }

// @filename: c.ts
const b = import('./a', { assert: { type: "json" } });

// @target: es2015
// @module: esnext
// @filename: x.ts
export const x = 1;
// @filename: b.ts
import.defer?.('./x');

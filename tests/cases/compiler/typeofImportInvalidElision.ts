// @filename: input.ts
export type X = 1;

// @filename: main.ts
type T2 = typeof import('./input.js', ,);

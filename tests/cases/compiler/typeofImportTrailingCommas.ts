// @filename: input.ts
export type X = 1;

// @filename: main.ts
type T1 = typeof import('./input.js',)
type T2 = typeof import('./input.js', { with: { "resolution-mode": "import" } },);

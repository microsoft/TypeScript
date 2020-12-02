// @isolatedModules: true

// @Filename: /a.ts
export type A = {};

// @Filename: /b.ts
export type { A } from './a'; // should not error, but would without `type`

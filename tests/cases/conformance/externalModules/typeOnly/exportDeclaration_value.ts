// @Filename: /a.ts
const A = {};
export type { A };
export const AA = {};

// @Filename: /b.ts
export type { AA } from './a';

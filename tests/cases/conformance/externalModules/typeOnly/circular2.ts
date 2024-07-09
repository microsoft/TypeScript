// @noEmit: true

// @Filename: /a.ts
import type { B } from './b';
export type A = B;

// @Filename: /b.ts
import type { A } from './a';
export type B = A;

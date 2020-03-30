// @noEmit: true

// @Filename: /a.ts
export type { A } from './b';

// @Filename: /b.ts
export type { A } from './a';

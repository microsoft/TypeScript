// @noEmit: true

// @Filename: /a.ts
import type { A } from './b';
export type { A as B };

// @Filename: /b.ts
import type { B } from './a';
export type { B as A };

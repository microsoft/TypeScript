// @strict: true
// @Filename: /a.ts
class A { a!: string }
export type { A as B };

// @Filename: /b.ts
export type { B as C } from './a';

// @Filename: /c.ts
import type { C as D } from './b';
const d: D = {};

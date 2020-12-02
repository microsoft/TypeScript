// @Filename: /a.ts
export class A { }

// @Filename: /b.ts
import type { A } from './a';
let AConstructor: typeof A;

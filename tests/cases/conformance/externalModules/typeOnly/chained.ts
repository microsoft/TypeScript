// @Filename: /a.ts
class A { a!: string }
export type { A as B };
export type Z = A;

// @Filename: /b.ts
import { Z as Y } from './a';
export { B as C } from './a';

// @Filename: /c.ts
import type { C } from './b';
export { C as D };

// @Filename: /d.ts
import { D } from './c';
new D();
const d: D = {};

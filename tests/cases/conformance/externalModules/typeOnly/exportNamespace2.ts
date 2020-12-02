// @Filename: a.ts
export class A {}

// @Filename: b.ts
export * as a from './a';

// @Filename: c.ts
import type { a } from './b';
export { a };

// @Filename: d.ts
import { a } from './c';
new a.A(); // Error

// @Filename: a.ts
export class A {}

// @Filename: b.ts
export type { A } from './a';

// @Filename: c.ts
export * from './b';

// @Filename: d.ts
import { A } from './c';
new A(); // Error

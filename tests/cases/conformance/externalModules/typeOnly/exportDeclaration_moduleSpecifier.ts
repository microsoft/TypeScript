// @Filename: /a.ts
export class A {}

// @Filename: /b.ts
export type { A } from './a';

// @Filename: /c.ts
import { A } from './b';
declare const a: A;
new A();

// @Filename: /a.ts
class A {}
export type { A };

// @Filename: /b.ts
import { A } from './a';
declare const a: A;
new A();

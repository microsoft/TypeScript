// @module: commonjs
// @isolatedModules: false, true

// @Filename: /a.ts
class A {}
export type { A };

// @Filename: /b.ts
import { A } from './a';
declare const a: A;
new A();

// @Filename: /c.ts
import type { A } from './a';
export = A;

// @Filename: /d.ts
import { A } from './a';
export = A;
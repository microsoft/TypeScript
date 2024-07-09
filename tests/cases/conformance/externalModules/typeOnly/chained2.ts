// @Filename: /a.ts
class A { a!: string }
export type { A as default };

// @Filename: /b.ts
import A from './a';
import type { default as B } from './a';
export { A, B };

// @Filename: /c.ts
import * as types from './b';
export { types as default };

// @Filename: /d.ts
import types from './c';
new types.A();
new types.B();
const a: types.A = {};
const b: types.B = {};

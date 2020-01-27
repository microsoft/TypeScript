// @Filename: /a.ts
class A {}
export type { A };
export class B {};

// @Filename: /b.ts
import * as types from './a';
let A: typeof types.A;
let B: typeof types.B;

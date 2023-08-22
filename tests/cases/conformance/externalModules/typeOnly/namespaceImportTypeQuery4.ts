// @Filename: /a.ts
import type { A } from './z'; // unresolved
type A = 0;
export { A };
export class B {};

// @Filename: /b.ts
import * as types from './a';
let t: typeof types = {
  A: undefined as any, // error
  B: undefined as any,
}

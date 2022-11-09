// @Filename: /a.ts
class A {}
export type { A };
export class B {};

// @Filename: /b.ts
import * as types from './a';
let A: typeof types.A;
let B: typeof types.B;

let t: typeof types = {
  // error: while you can ask for `typeof types.A`,
  // `typeof types` does not include `A`
  A: undefined as any,
  B: undefined as any,
}

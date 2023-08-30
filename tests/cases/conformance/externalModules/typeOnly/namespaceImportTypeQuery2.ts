// @Filename: /z.ts
interface A {}
export type { A };

// @Filename: /a.ts
import { A } from './z';
const A = 0;
export { A };
export class B {};

// @Filename: /b.ts
import * as types from './a';
let t: typeof types = {
  A: undefined as any, // ok
  B: undefined as any,
}

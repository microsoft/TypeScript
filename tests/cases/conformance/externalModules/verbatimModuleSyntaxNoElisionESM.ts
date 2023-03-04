// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: node

// @Filename: /a.ts
export const a = 0;
export type A = typeof a;
export class AClass {}

// @Filename: /b.ts
import { a, A, AClass } from "./a";
import type { a as aValue, A as AType } from "./a";
import { type A as AType2 } from "./a";

export { A };
export { A as A2 } from "./a";
export type { A as A3 } from "./a";
export { type A as A4 } from "./a";
export type { AClass } from "./a";

// @Filename: /c.ts
import { AClass } from "./b";

// @Filename: /main4.ts
export default 1; // ok

// @Filename: /main5.ts
export default class C {} // ok

// @Filename: /main6.ts
interface I {}
export default I; // error

// @Filename: /main7.ts
import type C from "./main5";
export default C; // error

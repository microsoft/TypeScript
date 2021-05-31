// @Filename: a.ts
export class A {}

// @Filename: b.ts
import type * as a from './a';
import A = a.A; // Error
import aa = a;  // Error

const x = 0;
export { a, A, x };

// @Filename: c.ts
import * as b from './b';
import A = b.a.A; // Error
import AA = b.A; // Error

import x = b.x;
console.log(x);

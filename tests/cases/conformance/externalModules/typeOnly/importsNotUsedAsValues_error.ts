// @importsNotUsedAsValues: error
// @noUnusedLocals: true

// @Filename: /a.ts
export default class {}
export class A {}
export type B = {};
export const enum C { One, Two }

// @Filename: /b.ts
import { A, B } from './a'; // Error
let a: A;
let b: B;
console.log(a, b);

// @Filename: /c.ts
import Default, * as named from './a'; // Error
let a: Default;
let b: named.B;
console.log(a, b);

// @Filename: /d.ts
import Default, { A } from './a';
const a = A;
let b: Default;
console.log(a, b);

// @Filename: /e.ts
import { A, B } from './a'; // noUnusedLocals error only

// @Filename: /f.ts
import { C } from './a';
import type { C as D } from './a';
C.One;
let c: D = C.Two;
let d: D.Two = C.Two;
console.log(c, d);

// @Filename: /g.ts
import { C } from './a';
let c: C;
let d: C.Two;
console.log(c, d);

// @Filename: /h.ts
class H {}
export = H;

// @Filename: /i.ts
import H = require('./h'); // Error
let h: H = {};
console.log(h);

// @Filename: /j.ts
import H = require('./h'); // noUnusedLocals error only

// @Filename: /k.ts
const enum K { One, Two }
export = K;

// @Filename: /l.ts
import K = require('./k');
K.One;

// @Filename: /j.ts
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
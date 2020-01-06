// @importsNotUsedAsValues: error
// @noUnusedLocals: true

// @Filename: /a.ts
export default class {}
export class A {}
export type B = {};

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

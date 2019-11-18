// @Filename: /a.ts
export default class A {}

// @Filename: /b.ts
import type A from './a';
new A();
let a: A;

// @module: commonjs
// @target: es2015
// @Filename: /a.ts
export default class A { a!: string }

// @Filename: /b.ts
import type A from './a';
new A();
let a: A = { a: '' };
let b = { A };

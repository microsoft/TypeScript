// @Filename: /abc.ts
export class A {}
export type B  = { b: string };
export const C = "";

// @Filename: /d.ts
import type { A, B, C } from './abc';
new A();
declare let a: A;
declare let b: B;
b.b;
const c = { A };

// @declaration: true

// @Filename: /a.ts
export class A {}
export class B {}
export class X {}

// @Filename: /b.ts
export type * from "./a";
export { X } from "./a";

// @Filename: /c.ts
import { A, B as C, X } from "./b";
let _: A = new A();   // Error
let __: C = new C();  // Error
let ___: X = new X(); // Ok

// @Filename: /d.ts
export type * from "./a";
export * from "./a";

// @Filename: /e.ts
import { A, B, X } from "./d";
let _: A = new A();   // Ok
let __: B = new B();  // Ok
let ___: X = new X(); // Ok
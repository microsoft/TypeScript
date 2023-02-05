// @Filename: /a.ts
export class A {}
export class B {}

// @Filename: /b.ts
export class B {}
export class C {}

// @Filename: /c.ts
export type * from "./a";
export * from "./b"; // Collision error

// @Filename: /d.ts
import { A, B, C } from "./c";
let _: A = new A();   // Error
let __: B = new B();  // Ok
let ___: C = new C(); // Ok

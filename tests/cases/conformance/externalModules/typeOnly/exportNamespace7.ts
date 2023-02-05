// @Filename: /a.ts
export class A {}
export class B {}
export class C {}

// @Filename: /b.ts
export type * from "./a";
export class C {}

// @Filename: /c.ts
import { A, B, C } from "./b";
let _: A = new A();  // Error
let __: B = new B(); // Error
let ___: C = new C(); // Ok

// @Filename: /d.ts
export type * from "./b";

// @Filename: /e.ts
import { A, B, C } from "./d";
let _: A = new A();   // Error
let __: B = new B();  // Error
let ___: C = new C(); // Error

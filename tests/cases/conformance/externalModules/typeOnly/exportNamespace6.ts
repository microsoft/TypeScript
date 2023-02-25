// @Filename: /a.ts
export class A {}
export class B {}

// @Filename: /b.ts
export type * from "./a";

// @Filename: /c.ts
export * from "./b";

// @Filename: /d.ts
import { A, B } from "./c";
let _: A = new A();  // Error
let __: B = new B(); // Error
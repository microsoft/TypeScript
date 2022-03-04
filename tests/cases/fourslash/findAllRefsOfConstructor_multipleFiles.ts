/// <reference path="fourslash.ts" />

// @Filename: f.ts

////class A {
////    /*aCtr*/constructor(s: string) {}
////}
////class B extends A { }
////export { A, B };

// @Filename: a.ts

////import { A as A1 } from "./f";
////const a1 = new A1("a1");
////export default class extends A1 { }
////export { B as B1 } from "./f";

// @Filename: b.ts

////import B, { B1 } from "./a";
////const d = new B("b");
////const d1 = new B1("b1");

verify.noErrors();
verify.baselineFindAllReferences('aCtr')

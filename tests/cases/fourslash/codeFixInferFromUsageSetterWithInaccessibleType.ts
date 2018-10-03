/// <reference path='fourslash.ts' />

// @noImplicitAny: true

// @Filename: /a.ts
////export class D {}
////export default new D();

// @Filename: /b.ts
////export class C {
////    [|set x(val) {}|]
////    method() { this.x = import("./a"); }
////}

goTo.file("/b.ts");
verify.not.codeFixAvailable();
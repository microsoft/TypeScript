/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
////interface /*def*/A {
////	foo: boolean;
////}
////interface [|B|] extends A {
////	bar: boolean;
////}
////export class [|C|] implements B {
////	foo = true;
////	bar = true;
////}
////export class [|D|] extends C { }

verify.baselineGoToImplementation("def");

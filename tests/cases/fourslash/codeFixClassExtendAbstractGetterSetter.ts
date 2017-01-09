/// <reference path='fourslash.ts' />

//// abstract class A {
////     private _a: string;
//// 
////     abstract get a(): string;
////     abstract set a(newName: string);
//// }
//// 
//// // Don't need to add anything in this case.
//// abstract class B extends A {}
//// 
//// class C extends A {[| |]}

verify.rangeAfterCodeFix(`
    a: string;
`);
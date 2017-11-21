/// <reference path="fourslash.ts" />

//// export class TestBase<T extends TestBase<T>>
//// {   
////     public publicMethod(p: any): void {}
////     private privateMethod(p: any): void {}
////     protected protectedMethod(p: any): void {}
////     public test(t: T): void
////     {
////         t./**/
////     }
//// }

goTo.marker();

verify.completionListContains('publicMethod');
verify.completionListContains('privateMethod');
verify.completionListContains('protectedMethod');

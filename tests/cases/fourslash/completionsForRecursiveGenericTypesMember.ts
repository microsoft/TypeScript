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

verify.completions({ marker: "", exact: ["publicMethod", "privateMethod", "protectedMethod", "test"] });

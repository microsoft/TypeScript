/// <reference path="fourslash.ts" />

//// class TestClass {
////     public function foo(x: string): void;
////     public function foo(): void;
////     foo(x: any): void {
////         this.bar(/**/x); // should not error
////     }
//// }
//// 

goTo.marker();
verify.quickInfoExists();
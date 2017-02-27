/// <reference path='fourslash.ts' />

//// function foo() {
////     interface I {
////         q: string
////     }
////     abstract class C {
////         abstract x: I};
////         p: number
////         constructor(){
////             this.x = { q: "text" };
////         }
////     }
////     return C;
//// }
//// class C extends foo() {[| |]}

verify.not.codeFixAvailable();
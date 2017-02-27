/// <reference path='fourslash.ts' />

//// function foo() {
////     interface I {
////         q: string
////     }
////     abstract class C {
////         abstract x: I & { p: number };
////         p: number
////         constructor(){
////             this.x = { p: 10, q: "text" };
////         }
////     }
////     return C;
//// }
//// class C extends foo() {[| |]}

verify.not.codeFixAvailable();
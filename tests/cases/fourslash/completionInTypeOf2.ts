/// <reference path='fourslash.ts'/>

////module m1c {
////    export class C { foo(): void; }
////}
////var x: typeof m1c./*1*/;

verify.completions({ marker: "1", exact: "C" });

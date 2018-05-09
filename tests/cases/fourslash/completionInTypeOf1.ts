/// <reference path='fourslash.ts'/>

////module m1c {
////    export interface I { foo(): void; }
////}
////var x: typeof m1c./*1*/;

// No completion because m1c is not an instantiated module.
verify.completions({ marker: "1", exact: undefined });

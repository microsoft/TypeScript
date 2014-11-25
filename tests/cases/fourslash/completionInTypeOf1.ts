/// <reference path='fourslash.ts'/>

////module m1c {
////    export interface I { foo(): void; }
////}
////var x: typeof m1c./*1*/;

goTo.marker('1');

// No completion because m1c is not an instantiated module.
verify.not.completionListContains('I');
verify.not.completionListContains('foo');
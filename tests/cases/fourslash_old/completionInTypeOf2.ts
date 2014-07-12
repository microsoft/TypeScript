/// <reference path='fourslash.ts'/>

////module m1c {
////    export class C { foo(): void; }
////}
////var x: typeof m1c./*1*/;

goTo.marker('1');
verify.completionListContains('C');
verify.not.completionListContains('foo');

/// <reference path='fourslash.ts'/>

////module m1c {
////    export interface I { foo(): void; }
////}
////var m1c = 1; // Should be allowed
////var x: m1c./*1*/;
////var /*2*/r = m1c;

goTo.marker('1');
verify.completionListContains('I');
verify.not.completionListContains('foo');

verify.quickInfoAt("2", "var r: number");

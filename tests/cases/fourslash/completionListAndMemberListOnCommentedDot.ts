/// <reference path='fourslash.ts' />

////module M {
////  export class C { public pub = 0; private priv = 1; }
////  export var V = 0;
////}
////
////
////var c = new M.C();
////
////c. // test on c.
////
//////Test for comment
//////c./**/

goTo.marker();
verify.completionListIsEmpty();
verify.completionListIsEmpty();
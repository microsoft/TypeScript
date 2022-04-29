/// <reference path="fourslash.ts" />

/////*start*/module M {
////    export class C { }
//// }/*end*/
////
////module M { }
////
////var c = new M.C();

goTo.marker('start');

var codeLength = test.markers()[1].position - test.markers()[0].position;
edit.deleteAtCaret(codeLength);

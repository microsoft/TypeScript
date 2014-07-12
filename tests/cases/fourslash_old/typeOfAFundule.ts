/// <reference path='fourslash.ts'/>

////function m1() { return 1; }
////module m1 { export var y = 2; }
////function foo13() {
////    return m1;
////}
////var r13/**/ = foo13();

goTo.marker();
verify.quickInfoIs('typeof m1');

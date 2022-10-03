/// <reference path='fourslash.ts'/>

////var x = 1;
////var r1, r2, r3, r4;
////module M {
////    r1 = x; // undefined
////}
////module M {
////    export var x = 2;
////    r2 = x; // 2
////}
////module M {
////    r3 = x; // 2
////}
////module M {
////    var x = 3;
////    r4 = x; // 3
////}

verify.noErrors();
verify.eval("r1", undefined);
verify.eval("r2", 2);
verify.eval("r3", 2);
verify.eval("r4", 3);

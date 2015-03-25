/// <reference path='fourslash.ts'/>

////module M {
////    export var x = <T>(x: T) => x;
////}
////var r = M./**/;

goTo.marker();
verify.completionListContains('x', 'var M.x: <T>(x: T) => T');

/// <reference path='fourslash.ts'/>

////module testModule {
////    export var foo = 1;
////}
////@
////testModule./**/

goTo.marker();
verify.completionListContains('foo', 'number');
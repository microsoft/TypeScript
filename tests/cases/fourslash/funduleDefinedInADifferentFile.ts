/// <reference path='fourslash.ts'/>
 
////function E() {  }
////module E {
////    export interface I {}
////    export var value = 1;
////}
 
////var x: E.I;
////var y/**/ = E.value;
goTo.marker();
verify.numberOfErrorsInCurrentFile(0);
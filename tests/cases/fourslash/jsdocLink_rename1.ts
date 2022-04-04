/// <reference path='fourslash.ts'/>

//// interface A/**/ {}
//// /**
////  * {@link A()} is ok
////  */
//// declare const a: A

verify.baselineRename('', {})

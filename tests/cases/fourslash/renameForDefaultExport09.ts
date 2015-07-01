/// <reference path='fourslash.ts'/>

// @Filename: foo.ts
////function /**/[|f|]() {
////    return 100;
////}
////
////export default f;
////
////var x: typeof f;
////
////var y = f();
////
/////**
//// *  Commenting f
//// */
////namespace f {
////    var local = 100;
////}

goTo.marker();
verify.renameInfoSucceeded("f", "f");
/// <reference path='fourslash.ts'/>

////module M {
////    export var /*1*/variable = 0;
////
////    // local use
////    var x = /*2*/variable;
////}
////
////// external use
////M./*3*/variable

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(3);
});
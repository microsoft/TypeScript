/// <reference path='fourslash.ts'/>

////var x = 0;
////
////with ({}) {
////    var y = x;  // Reference of x here should not be picked
////    /*2*/y++;        // also reference for y should be ignored
////}
////
////x = /*1*/x + 1;

goTo.marker('1');
verify.referencesCountIs(3);

goTo.marker('2');
verify.referencesCountIs(1);
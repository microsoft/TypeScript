/// <reference path='fourslash.ts'/>

////enum E {
////    /*value1*/value1 = 1,
////    "value2" = value1,
////    111 = 11
////}
////
////E.value1;
////E["value2"];
////E./*value2*/value2;
////E[/*value3*/111];


goTo.marker("value1");
verify.referencesCountIs(3);

goTo.marker("value2");
verify.referencesCountIs(3);

goTo.marker("value3");
verify.referencesCountIs(2);
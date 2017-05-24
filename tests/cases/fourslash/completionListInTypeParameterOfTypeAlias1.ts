/// <reference path='fourslash.ts'/>

////type List1</*0*/
////type List2</*1*/T> = T[];
////type List4<T> = /*2*/T[];
////type List3<T1> = /*3*/;

goTo.marker("0");
verify.completionListIsEmpty();
goTo.marker("1");
verify.completionListIsEmpty();
goTo.marker("2");
verify.completionListContains("T");
goTo.marker("3");
verify.not.completionListIsEmpty();
verify.not.completionListContains("T");
verify.completionListContains("T1");
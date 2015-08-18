/// <reference path='fourslash.ts'/>

////var C0 = class D</*0*/
////var C1 = class D</*1*/T> {}
////var C3 = class D<T, /*2*/
////var C4 = class D<T, /*3*/U>{}

goTo.marker("0");
verify.completionListIsEmpty();
goTo.marker("1");
verify.completionListIsEmpty();
goTo.marker("2");
verify.completionListIsEmpty();
goTo.marker("3");
verify.completionListIsEmpty();
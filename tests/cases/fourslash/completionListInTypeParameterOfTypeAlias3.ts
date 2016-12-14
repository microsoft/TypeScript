/// <reference path='fourslash.ts'/>

//// type constructorType<T1, T2> = new <T/*1*/, /*2*/

goTo.marker("1");
verify.completionListContains("T");
verify.completionListContains("T1");
verify.completionListContains("T2");

goTo.marker("2");
verify.completionListContains("T");
verify.completionListContains("T1");
verify.completionListContains("T2");
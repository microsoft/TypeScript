/// <reference path='fourslash.ts'/>

//// type constructorType<T1, T2> = new <T/*1*/, /*2*/

goTo.marker("1");
verify.memberListContains("T");
verify.memberListContains("T1");
verify.memberListContains("T2");

goTo.marker("2");
verify.memberListContains("T");
verify.memberListContains("T1");
verify.memberListContains("T2");
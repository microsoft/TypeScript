/// <reference path='fourslash.ts'/>

// Should not crash when invoked on an invalid location

//// var x1 = 50/*0*/0;
//// var x2 = "hel/*1*/lo";
//// /*2*/

for(var i = 0; i < 3; i++) {
    goTo.marker("" + i);
    verify.implementationListIsEmpty();
}
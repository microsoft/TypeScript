/// <reference path='fourslash.ts'/>

// References to a unknown index property

////var a;
////a[/*1*/"blah"];

goTo.marker("1");
verify.referencesCountIs(1);
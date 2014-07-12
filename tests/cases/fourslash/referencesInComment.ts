/// <reference path='fourslash.ts'/>

////// References to /*1*/foo or b/*2*/ar
/////* in comments should not find fo/*3*/o or bar/*4*/ */
////class foo { }
////var bar = 0;

goTo.marker("1");
verify.referencesCountIs(0);

goTo.marker("2");
verify.referencesCountIs(0);

goTo.marker("3");
verify.referencesCountIs(0);

goTo.marker("4");
verify.referencesCountIs(0);
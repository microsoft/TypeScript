/// <reference path='fourslash.ts'/>

////f/*1*/oo = fo/*2*/o;

////var /*3*/bar = function () { };
////ba/*4*/r = b/*5*/ar + 1;

goTo.marker("1");
verify.referencesCountIs(1);

goTo.marker("2");
verify.referencesCountIs(1);

goTo.marker("3");
verify.referencesCountIs(3);

goTo.marker("4");
verify.referencesCountIs(3);

goTo.marker("5");
verify.referencesCountIs(3);
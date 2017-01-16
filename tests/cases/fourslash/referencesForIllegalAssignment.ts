/// <reference path='fourslash.ts'/>

////f/*1*/oo = fo/*2*/o;

////var [|bar|] = function () { };
////[|bar|] = [|bar|] + 1;

goTo.marker("1");
verify.referencesAre([]);

goTo.marker("2");
verify.referencesAre([]);

verify.rangesReferenceEachOther();

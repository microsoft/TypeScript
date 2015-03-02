/// <reference path='fourslash.ts'/>

////var f: new () => void;
////f./*1*/

goTo.marker('1');
verify.completionListContains('apply');
verify.completionListContains('arguments');
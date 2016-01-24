/// <reference path='fourslash.ts' />

////var x : (s/*1*/

////var y : (s:string, list/*2*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});
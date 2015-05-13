/// <reference path='fourslash.ts' />

////var x : (/*1*/) => void;

////var y : (s:string, list/*2*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});
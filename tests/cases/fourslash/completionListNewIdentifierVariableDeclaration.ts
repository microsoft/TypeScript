/// <reference path='fourslash.ts' />

////var x : (s/*1*/

////var y : (s:string, list/*2*/

goTo.eachMarker(() => {
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});

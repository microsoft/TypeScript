/// <reference path='fourslash.ts' />

////function F(pref: (a/*1*/

goTo.eachMarker(() => {
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});

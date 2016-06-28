/// <reference path='fourslash.ts' />

////function F(pref: (a/*1*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});

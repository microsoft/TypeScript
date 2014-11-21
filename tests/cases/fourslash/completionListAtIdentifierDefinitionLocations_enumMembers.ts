/// <reference path='fourslash.ts' />

////var aa = 1;

////enum a { /*enumValueName1*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

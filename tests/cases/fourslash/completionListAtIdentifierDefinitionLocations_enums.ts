/// <reference path='fourslash.ts' />

////var aa = 1;

////enum /*enumName1*/

////enum a/*enumName2*/

////var x = 0; enum /*enumName4*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

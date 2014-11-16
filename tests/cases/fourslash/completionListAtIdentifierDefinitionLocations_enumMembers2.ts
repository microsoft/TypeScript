/// <reference path='fourslash.ts' />

////var aa = 1;
////enum a { foo, /*enumValueName3*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

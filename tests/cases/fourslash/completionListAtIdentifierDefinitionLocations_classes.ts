/// <reference path='fourslash.ts' />

////var aa = 1;

////class /*className1*/

////class a/*className2*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

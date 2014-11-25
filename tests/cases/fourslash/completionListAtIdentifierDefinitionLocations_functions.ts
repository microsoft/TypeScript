/// <reference path='fourslash.ts' />

////var aa = 1;

////function /*functionName1*/

////function a/*functionName2*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

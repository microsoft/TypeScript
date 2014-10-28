/// <reference path='fourslash.ts' />

////var aa = 1;

////module /*moduleName1*/

////module a/*moduleName2*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

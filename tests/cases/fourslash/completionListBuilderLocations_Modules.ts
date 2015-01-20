/// <reference path='fourslash.ts' />

////module A/*moduleName1*/


////module A./*moduleName2*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    debugger;
    verify.completionListIsBuilder();
});
/// <reference path='fourslash.ts' />

////var aa = 1;

//// try {} catch(/*catchVariable1*/

//// try {} catch(a/*catchVariable2*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

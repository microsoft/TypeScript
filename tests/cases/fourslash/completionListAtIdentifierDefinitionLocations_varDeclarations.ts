/// <reference path='fourslash.ts' />

////var aa = 1;


////var /*varName1*/

////var a/*varName2*/

////var a2,/*varName3*/

////var a2, a/*varName4*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

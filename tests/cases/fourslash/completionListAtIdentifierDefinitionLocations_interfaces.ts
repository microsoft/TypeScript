/// <reference path='fourslash.ts' />

////var aa = 1;

////interface /*interfaceName1*/

////interface a/*interfaceName2*/


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

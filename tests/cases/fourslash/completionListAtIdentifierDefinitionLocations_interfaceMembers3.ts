/// <reference path='fourslash.ts' />

////var aa = 1;

////interface a { f; /*interfaceValue3*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

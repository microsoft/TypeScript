/// <reference path='fourslash.ts' />

//// var [x/*variable1*/

//// var [x, y/*variable2*/

//// var [./*variable3*/

//// var [x, ...z/*variable4*/

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});

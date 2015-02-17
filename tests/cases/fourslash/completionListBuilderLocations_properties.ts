/// <reference path='fourslash.ts' />

////var aa = 1;

////class A1 {
////    public static /*property1*/
////}

////class A2 {
////    public static a/*property2*/
////}

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});
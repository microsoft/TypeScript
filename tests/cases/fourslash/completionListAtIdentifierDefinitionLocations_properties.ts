/// <reference path='fourslash.ts' />

////var aa = 1;

////class A1 {
////    /*property1*/
////}

////class A2 {
////    p/*property2*/
////}

////class A3 {
////    public s/*property3*/
////}

////class A4 {
////    a/*property4*/
////}

////class A5 {
////    public a/*property5*/
////}

////class A6 {
////    protected a/*property6*/
////}

////class A7 {
////    private a/*property7*/
////}

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.not.completionListIsEmpty();
    verify.completionListAllowsNewIdentifier();
});
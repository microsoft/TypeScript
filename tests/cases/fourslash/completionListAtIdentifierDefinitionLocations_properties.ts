/// <reference path='fourslash.ts' />

////var aa = 1;

////class A1 {
////    public /*property1*/
////}

////class A2 {
////    public a/*property2*/
////}

////class A3 {
////    private /*property3*/
////}

////class A4 {
////    private a/*property4*/
////}

////class A5 {
////    public static /*property5*/
////}

////class A6 {
////    public static a/*property6*/
////}

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});
/// <reference path="fourslash.ts" />

////class Base {
////    private privateInstanceMethod() { }
////    public publicInstanceMethod() { }
////
////    private privateProperty = 1;
////    public publicProperty = 1;
////
////    private static privateStaticProperty = 1;
////    public static publicStaticProperty = 1;
////
////    private static privateStaticMethod() { }
////    public static publicStaticMethod() {
////        Class./*staticsInsideClassScope*/publicStaticMethod();
////        var c = new Class();
////        c./*instanceMembersInsideClassScope*/privateProperty;
////    }
////}
////class Class extends Base {
////    private test() {
////        super./**/
////    }
////}


goTo.marker();
verify.not.completionListContains("publicProperty");
verify.completionListContains("publicInstanceMethod");
// No statics
verify.not.completionListContains("publicStaticProperty");
verify.not.completionListContains("publicStaticMethod");
// No privates
verify.not.completionListContains("privateProperty");
verify.not.completionListContains("privateInstanceMethod");
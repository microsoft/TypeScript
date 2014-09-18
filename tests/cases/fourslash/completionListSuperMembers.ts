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
verify.memberListContains("publicProperty");
verify.memberListContains("publicInstanceMethod");
// No statics
verify.not.memberListContains("publicStaticProperty");
verify.not.memberListContains("publicStaticMethod");
// No privates
verify.not.memberListContains("privateProperty");
verify.not.memberListContains("privateInstanceMethod");
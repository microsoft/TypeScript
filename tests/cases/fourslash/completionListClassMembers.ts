/// <reference path="fourslash.ts" />


////class Class {
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
////
////Class./*staticsOutsideClassScope*/publicStaticMethod();
////var c = new Class();
////c./*instanceMembersOutsideClassScope*/privateProperty;


goTo.marker("staticsInsideClassScope");
verify.memberListContains("privateStaticProperty");
verify.memberListContains("privateStaticMethod");
verify.memberListContains("publicStaticProperty");
verify.memberListContains("publicStaticMethod");
// No instance properties
verify.not.memberListContains("privateProperty");
verify.not.memberListContains("privateInstanceMethod");
// constructors should have a 'prototype' member
verify.memberListContains("prototype");

goTo.marker("instanceMembersInsideClassScope");
verify.memberListContains("privateProperty");
verify.memberListContains("privateInstanceMethod");
verify.memberListContains("publicProperty");
verify.memberListContains("publicInstanceMethod");
// No statics
verify.not.memberListContains("privateStaticProperty");
verify.not.memberListContains("privateStaticMethod");


goTo.marker("staticsOutsideClassScope");
// No privates
verify.not.memberListContains("privateStaticProperty");
verify.not.memberListContains("privateStaticMethod");
// Only publics
verify.memberListContains("publicStaticProperty");
verify.memberListContains("publicStaticMethod");
// No instance properties
verify.not.memberListContains("publicProperty");
verify.not.memberListContains("publicInstanceMethod");
// constructors should have a 'prototype' member
verify.memberListContains("prototype");

goTo.marker("instanceMembersOutsideClassScope");
// No privates
verify.not.memberListContains("privateProperty");
verify.not.memberListContains("privateInstanceMethod");
// Only publics
verify.memberListContains("publicProperty");
verify.memberListContains("publicInstanceMethod");
// No statics
verify.not.memberListContains("publicStaticProperty");
verify.not.memberListContains("publicStaticMethod");
/// <reference path='fourslash.ts'/>

////class Base {
////    private static privateMethod() { }
////    private static privateProperty;
////
////    protected static protectedMethod() { }
////    protected static protectedProperty;
////
////    public static publicMethod() { }
////    public static publicProperty;
////
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////
////    static test() {
////        Base./*1*/;
////        this./*2*/;
////        C1./*3*/;
////    }
////}
////
////class C1 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}


// Same class, everything is visible
goTo.marker("1");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

// Can not access protected properties overridden in subclass
goTo.marker("3");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.not.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');
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
////}
////
////class C2 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////
////    static test() {
////        Base./*1*/;
////        C2./*2*/;
////        this./*3*/;
////        super./*4*/;
////    }
////}


// Same class, everything is visible
goTo.marker("1");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

goTo.marker("3");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

// only public and protected methods of the base class are accessible through super
goTo.marker("4");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.not.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');
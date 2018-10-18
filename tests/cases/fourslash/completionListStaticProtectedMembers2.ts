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
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

goTo.marker("3");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

// only public and protected methods of the base class are accessible through super
goTo.marker("4");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.not.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');
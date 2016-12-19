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
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

// Can not access protected properties overridden in subclass
goTo.marker("3");
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.not.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');
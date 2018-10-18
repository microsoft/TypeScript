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
////class C3 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}
////
////Base./*1*/;
////C3./*2*/;


// Only public properties are visible outside the class
goTo.marker("1");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.not.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.not.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.not.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.not.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');
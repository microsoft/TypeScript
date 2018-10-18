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
/////// Make the protected members public
////class C4 extends Base {
////    public static protectedOverriddenMethod() { }
////    public static protectedOverriddenProperty;
////}
////class Derived extends C4 {
////   test() {
////        Derived./*1*/
////   }
////}
//// Derived./*2*/

// Sub class, everything but private is visible
goTo.marker("1");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

// Can see protected methods elevated to public
goTo.marker("2");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.not.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

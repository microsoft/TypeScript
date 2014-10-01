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
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

// Can see protected methods elevated to public
goTo.marker("2");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.not.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

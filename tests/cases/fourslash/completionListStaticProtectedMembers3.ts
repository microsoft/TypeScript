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
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.not.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.not.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.not.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.not.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');
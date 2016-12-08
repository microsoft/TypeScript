/// <reference path='fourslash.ts'/>

////class Base {
////    private privateMethod() { }
////    private privateProperty;
////
////    protected protectedMethod() { }
////    protected protectedProperty;
////
////    public publicMethod() { }
////    public publicProperty;
////
////    protected protectedOverriddenMethod() { }
////    protected protectedOverriddenProperty;
////}
////
////class C1 extends Base {
////    protected  protectedOverriddenMethod() { }
////    protected  protectedOverriddenProperty;
////}
////
//// var b: Base;
//// var c: C1;
//// b./*1*/;
//// c./*2*/;

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

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
////    public protectedOverriddenMethod() { }
////    public protectedOverriddenProperty;
////}
////
//// var c: C1;
//// c./*1*/


goTo.marker("1");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.not.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

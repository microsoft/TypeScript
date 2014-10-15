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
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.not.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

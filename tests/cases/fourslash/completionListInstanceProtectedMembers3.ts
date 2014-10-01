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

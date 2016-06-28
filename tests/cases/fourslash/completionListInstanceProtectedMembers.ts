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
////
////    test() {
////        this./*1*/;
////
////        var b: Base;
////        var c: C1;
////
////        b./*2*/;
////        c./*3*/;
////    }
////}
////
////class C1 extends Base {
////    protected  protectedOverriddenMethod() { }
////    protected  protectedOverriddenProperty;
////}


// Same class, everything is visible
goTo.marker("1");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

// Can not access protected properties overridden in subclass
goTo.marker("3");
verify.memberListContains('privateMethod');
verify.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.not.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');
